/**
 * ERC Defense Lead Form Handler
 * Routes submissions to: Google Sheets, Email, and Custom Webhook
 */

const FormHandler = {
    // Configuration - Update these endpoints
    config: {
        // Google Apps Script Web App URL (handles Sheet + Email)
        googleScriptUrl: '', // Will be set after deploying Apps Script

        // Custom webhook endpoint (CRM, database, etc.)
        webhookUrl: '', // e.g., 'https://your-n8n-instance.com/webhook/erc-leads'

        // Fallback: Formspree endpoint (optional backup)
        formspreeUrl: '', // e.g., 'https://formspree.io/f/xxxxx'

        // Enable/disable endpoints
        enableGoogleSheet: true,
        enableWebhook: true,
        enableFormspree: false,
    },

    /**
     * Initialize form handlers on page load
     */
    init() {
        document.querySelectorAll('[data-lead-form]').forEach(form => {
            form.addEventListener('submit', (e) => this.handleSubmit(e));
        });
    },

    /**
     * Handle form submission
     */
    async handleSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const submitBtn = form.querySelector('[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;

        // Show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner"></span> Submitting...';

        // Collect form data
        const formData = this.collectFormData(form);

        // Add metadata
        formData.timestamp = new Date().toISOString();
        formData.page = window.location.pathname;
        formData.source = this.getUtmParams();
        formData.userAgent = navigator.userAgent;

        try {
            // Send to all configured endpoints in parallel
            const promises = [];

            if (this.config.enableGoogleSheet && this.config.googleScriptUrl) {
                promises.push(this.sendToGoogleScript(formData));
            }

            if (this.config.enableWebhook && this.config.webhookUrl) {
                promises.push(this.sendToWebhook(formData));
            }

            if (this.config.enableFormspree && this.config.formspreeUrl) {
                promises.push(this.sendToFormspree(formData));
            }

            // If no endpoints configured, show warning
            if (promises.length === 0) {
                console.warn('No form endpoints configured. Logging data:', formData);
                // Still show success for demo purposes
            }

            // Wait for all to complete (don't fail if one fails)
            const results = await Promise.allSettled(promises);

            // Check if at least one succeeded
            const hasSuccess = results.some(r => r.status === 'fulfilled');

            if (hasSuccess || promises.length === 0) {
                this.showSuccess(form);
                this.trackConversion(formData);
            } else {
                throw new Error('All submission endpoints failed');
            }

        } catch (error) {
            console.error('Form submission error:', error);
            this.showError(form, 'Something went wrong. Please call us directly or try again.');
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        }
    },

    /**
     * Collect all form field data
     */
    collectFormData(form) {
        const data = {};
        const formDataObj = new FormData(form);

        for (const [key, value] of formDataObj.entries()) {
            data[key] = value;
        }

        // Also collect any fields without name but with id
        form.querySelectorAll('input, select, textarea').forEach(field => {
            if (!field.name && field.id && field.value) {
                data[field.id] = field.value;
            }
        });

        return data;
    },

    /**
     * Get UTM parameters from URL
     */
    getUtmParams() {
        const params = new URLSearchParams(window.location.search);
        return {
            utm_source: params.get('utm_source') || 'direct',
            utm_medium: params.get('utm_medium') || '',
            utm_campaign: params.get('utm_campaign') || '',
            utm_content: params.get('utm_content') || '',
            utm_term: params.get('utm_term') || '',
            gclid: params.get('gclid') || '',
            fbclid: params.get('fbclid') || '',
        };
    },

    /**
     * Send to Google Apps Script (Sheet + Email)
     */
    async sendToGoogleScript(data) {
        const response = await fetch(this.config.googleScriptUrl, {
            method: 'POST',
            mode: 'no-cors', // Required for Apps Script
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return true; // no-cors doesn't return response body
    },

    /**
     * Send to custom webhook
     */
    async sendToWebhook(data) {
        const response = await fetch(this.config.webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`Webhook error: ${response.status}`);
        }

        return await response.json();
    },

    /**
     * Send to Formspree (backup option)
     */
    async sendToFormspree(data) {
        const response = await fetch(this.config.formspreeUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`Formspree error: ${response.status}`);
        }

        return await response.json();
    },

    /**
     * Show success message
     */
    showSuccess(form) {
        const successHtml = `
            <div class="form-success">
                <h3>Thank You!</h3>
                <p>We've received your request. A member of our team will contact you within 24 hours.</p>
                <p style="margin-top: 1rem; font-size: 0.875rem;">
                    Need immediate help? Call <a href="tel:4435453023" style="color: #166534; font-weight: 700;">(443) 545-3023</a>
                </p>
            </div>
        `;
        form.innerHTML = successHtml;

        // Scroll to show success message
        form.scrollIntoView({ behavior: 'smooth', block: 'center' });
    },

    /**
     * Show error message
     */
    showError(form, message) {
        // Remove any existing error
        const existingError = form.querySelector('.form-error');
        if (existingError) existingError.remove();

        const errorDiv = document.createElement('div');
        errorDiv.className = 'form-error';
        errorDiv.textContent = message;
        form.insertBefore(errorDiv, form.firstChild);
    },

    /**
     * Track conversion in analytics
     */
    trackConversion(data) {
        // Google Analytics 4
        if (typeof gtag !== 'undefined') {
            gtag('event', 'generate_lead', {
                event_category: 'Lead',
                event_label: data.situation || 'Unknown',
                value: 1,
            });
        }

        // Google Ads conversion (if configured)
        if (typeof gtag !== 'undefined' && window.googleAdsConversionId) {
            gtag('event', 'conversion', {
                send_to: window.googleAdsConversionId,
            });
        }

        // Facebook Pixel
        if (typeof fbq !== 'undefined') {
            fbq('track', 'Lead', {
                content_name: 'ERC Defense',
                content_category: data.situation || 'Unknown',
            });
        }

        // Custom event for other tracking
        window.dispatchEvent(new CustomEvent('leadSubmitted', { detail: data }));
    },
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => FormHandler.init());
} else {
    FormHandler.init();
}

// Export for configuration access
window.FormHandler = FormHandler;
