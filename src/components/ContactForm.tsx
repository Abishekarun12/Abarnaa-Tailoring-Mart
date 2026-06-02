/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { sendBoutiqueInquiryEmail } from '../services/googleWorkspace';

interface ContactFormProps {
  accessToken: string | null;
  onLogin: () => void;
}

export default function ContactForm({
  accessToken,
  onLogin
}: ContactFormProps) {
  // Local input parameters
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  // Action indicators
  const [isSending, setIsSending] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);

    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      setStatusMessage({ type: 'error', text: 'Please complete all fields in the contact inquiry.' });
      return;
    }

    if (!accessToken) {
      setStatusMessage({ 
        type: 'error', 
        text: 'Google security permission required. Please connect your Google account in the navbar to send secure automated Gmail messages.' 
      });
      return;
    }

    // Require explicit confirmation for mail triggers per workspace integrations requirements
    const userAgreed = window.confirm(
      `Send this inquiry email to Abarnaa Tailoring Mart at abiakpro7708@gmail.com? This uses your connected Google OAuth session.`
    );
    if (!userAgreed) return;

    setIsSending(true);
    try {
      await sendBoutiqueInquiryEmail(accessToken, formData);
      setStatusMessage({
        type: 'success',
        text: 'Message dispatched! Your inquiry has been emailed securely to abiakpro7708@gmail.com using your Google session. We will reach back shortly!'
      });
      // Clear inputs
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
    } catch (err: any) {
      console.error(err);
      setStatusMessage({
        type: 'error',
        text: 'Failed to send email. Verify your Gmail account scopes are active, or contact us directly at +91 94432 77080.'
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-stone-100 relative">
      <div className="absolute inset-0 tailor-pattern opacity-5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Contact header specs */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[11px] font-display uppercase tracking-widest text-gold-600 font-bold mb-2 block">Customer Helpline</span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-stone-900 mb-4">Leave Us a Message</h2>
          <div className="h-[2px] w-16 bg-gold-400 mx-auto mb-4"></div>
          <p className="text-stone-600 text-sm font-sans leading-relaxed">
            Have any queries about stitching rates, custom patterns, or machinery spares? 
            Authorized customers can submit inquiries directly via automated Gmail integrations below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-5xl mx-auto items-stretch">
          
          {/* Quick Details Deck */}
          <div className="lg:col-span-5 bg-amber-950 text-stone-50 rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden shadow-xl stitch-border border-gold-500">
            <div className="absolute inset-0 tailor-pattern opacity-10 pointer-events-none" />
            
            <div className="relative z-10">
              <h3 className="font-serif text-2xl font-bold mb-6 text-gold-200">Boutique Contact Deck</h3>
              <p className="text-stone-300 text-xs leading-relaxed mb-8">
                Drop by our branches or contact our main stitching lines. Our design masters and machine assistants are available to assist you.
              </p>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <Phone className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-display uppercase tracking-wider text-gold-300 font-bold">Stitching Lines</h4>
                    <p className="text-sm font-sans">+91 94432 77080</p>
                    <p className="text-[11px] text-stone-400 mt-1">Bypass machinery: +91 94432 77081</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Mail className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-display uppercase tracking-wider text-gold-300 font-bold">Inquiries Email</h4>
                    <a href="mailto:abiakpro7708@gmail.com" className="text-sm font-sans hover:underline hover:text-gold-200">
                      abiakpro7708@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <MapPin className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-display uppercase tracking-wider text-gold-300 font-bold">Madurai Branches</h4>
                    <p className="text-xs text-stone-300 leading-normal font-sans">
                      Branch 1: Meenakshi Temple Town Area<br />
                      Branch 2: Kalavasal Bypass Machinery Hub
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 text-[11px] text-amber-300 font-display font-medium tracking-widest uppercase border-t border-amber-900 pt-6">
              ✨ SERVING LADIES WEAR ONLY SINCE 1998 ✨
            </div>
          </div>

          {/* Interactive Form Column */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 md:p-8 border border-gold-200 shadow-lg flex flex-col justify-between">
            <div>
              <div className="border-b border-gold-200 pb-4 mb-6">
                <h3 className="font-serif text-lg font-bold text-stone-900">Direct Email Inquiry</h3>
                <p className="text-xs text-stone-400 font-sans">Dispatches via client Gmail API to owner account</p>
              </div>

              {!accessToken ? (
                // Force Auth to submit
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Mail className="w-10 h-10 text-gold-500 mb-3" />
                  <h4 className="font-serif font-bold text-stone-800 text-sm mb-1">Direct Gmail Mailbox Closed</h4>
                  <p className="text-xs text-stone-500 max-w-sm mb-6 leading-relaxed">
                    To send customized forms directly to our main inbox, we leverage Google OAuth to connect securely. 
                    Please log in using the header button.
                  </p>
                  <button
                    onClick={onLogin}
                    className="px-6 py-3 border border-gold-300 rounded-full text-xs font-display font-bold hover:bg-gold-50 transition-colors inline-flex items-center gap-2"
                  >
                    Connect Access Session
                  </button>
                </div>
              ) : (
                // Connected Form
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-display uppercase tracking-wider text-stone-500 font-bold mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Abirami Karthick"
                        required
                        className="w-full text-sm py-2 px-4 bg-stone-50 border border-gold-200 rounded-lg focus:outline-none focus:border-gold-500 text-stone-800 font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-display uppercase tracking-wider text-stone-500 font-bold mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="abi@example.com"
                        required
                        className="w-full text-sm py-2 px-4 bg-stone-50 border border-gold-200 rounded-lg focus:outline-none focus:border-gold-500 text-stone-800 font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-display uppercase tracking-wider text-stone-500 font-bold mb-1.5">
                      Contact WhatsApp / Phone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+91 94432 XXXXX"
                      required
                      className="w-full text-sm py-2 px-4 bg-stone-50 border border-gold-200 rounded-lg focus:outline-none focus:border-gold-500 text-stone-800 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-display uppercase tracking-wider text-stone-500 font-bold mb-1.5">
                      Your Message, Patterns or Catalog Queries *
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="e.g., Do you sell rotary hooks for domestic Singer machines? Also, please share stitching rates for general hand-embroidered wedding blouse pieces."
                      required
                      className="w-full text-sm py-2 px-4 bg-stone-50 border border-gold-200 rounded-lg focus:outline-none focus:border-gold-500 text-stone-800 font-medium"
                    />
                  </div>

                  {statusMessage && (
                    <div
                      className={`text-xs p-3 rounded-lg border font-display flex items-start gap-2 ${
                        statusMessage.type === 'success'
                          ? 'bg-green-50 text-green-800 border-green-200'
                          : 'bg-red-50 text-red-850 border-red-200'
                      }`}
                    >
                      {statusMessage.type === 'success' ? (
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
                      )}
                      <span>{statusMessage.text}</span>
                    </div>
                  )}

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSending}
                      className="w-full py-3 bg-amber-800 hover:bg-amber-900 text-stone-50 font-display font-semibold text-xs uppercase tracking-widest rounded-lg shadow transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {isSending ? 'Transmitting GMail...' : 'Send secure email inquiry'}
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
