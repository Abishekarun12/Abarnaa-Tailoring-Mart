/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Clock, Phone, User as UserIcon, BookOpen, AlertCircle, CheckCircle } from 'lucide-react';
import { BookingDetails } from '../types';
import { createFittingAppointment } from '../services/googleWorkspace';

interface FittingSchedulerProps {
  accessToken: string | null;
  onLogin: () => void;
}

export default function FittingScheduler({
  accessToken,
  onLogin
}: FittingSchedulerProps) {
  // Input form state
  const [formData, setFormData] = useState<BookingDetails>({
    name: '',
    email: '',
    phone: '',
    fittingType: 'Blouse Stitching',
    date: '',
    time: '',
    notes: ''
  });

  // Action status indicators
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);

    // Basic client validation
    if (!formData.name || !formData.phone || !formData.date || !formData.time) {
      setStatusMessage({ type: 'error', text: 'Please fill in all required fitting parameters.' });
      return;
    }

    if (!accessToken) {
      setStatusMessage({ type: 'error', text: 'Please connect your Google Account in order to schedule appointments on Google Calendar.' });
      return;
    }

    // Ask for user confirmation for mutating API call as REQUIRED by system skill rules:
    // "When writing code that updates, modifies, or deletes end user data through any Workspace API, you MUST always include an explicit user confirmation dialog before the operation executes."
    const confirmMessage = `Ready to book a ${formData.fittingType} fitting session on ${formData.date} at ${formData.time}? This automatically syncs this event directly to your Google Calendar and invites Abarnaa Tailoring Mart's official scheduler.`;
    const userAgreed = window.confirm(confirmMessage);
    if (!userAgreed) return;

    setIsSubmitting(true);
    try {
      await createFittingAppointment(accessToken, formData);
      setStatusMessage({
        type: 'success',
        text: 'Succesfully Booked! Your fitting session has been created on your Google Calendar, and an invite has been dispatched to Abarnaa Tailoring Mart.'
      });
      // Reset inputs
      setFormData({
        name: '',
        email: '',
        phone: '',
        fittingType: 'Blouse Stitching',
        date: '',
        time: '',
        notes: ''
      });
    } catch (err: any) {
      console.error(err);
      setStatusMessage({
        type: 'error',
        text: 'Failed to create calendar appointment. Verify you granted the calendar Permission in your Google Auth settings, or try logging out and in again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="calendar" className="py-20 bg-stone-100 relative">
      <div className="absolute inset-0 tailor-pattern opacity-5 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Calendar Description / Visual Column */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <span className="text-[11px] font-display uppercase tracking-widest text-gold-600 font-bold mb-2">Tailoring Consultations</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-stone-900 mb-6 leading-tight">
              Book Your Custom Fitting Appointment
            </h2>
            <div className="h-[2px] w-16 bg-gold-400 mb-6"></div>
            
            <p className="text-stone-600 text-sm font-sans mb-8 leading-relaxed">
              Achieve absolute sartorial perfection. Use our interactive fits planner to schedule custom measurements, neck pattern consultation, or trial fittings at either branch. 
              Signing in automatically synchronizes the slot into your private Google Calendar.
            </p>

            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="bg-amber-100 text-amber-800 p-2 rounded-xl border border-gold-300 h-10 w-10 shrink-0 flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-serif font-bold text-stone-800">45-Minute Focused fitting</h4>
                  <p className="text-xs text-stone-500">Includes direct master measurement consultations and sleeve length designs.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-amber-100 text-amber-800 p-2 rounded-xl border border-gold-300 h-10 w-10 shrink-0 flex items-center justify-center">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-serif font-bold text-stone-800">Automatic Calendar Sync</h4>
                  <p className="text-xs text-stone-500">Fully transparent OAuth 2.0 calendar invitation sent directly to your phone.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Schedular Booking Form Box */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-gold-200">
              <div className="border-b border-gold-200 pb-4 mb-6">
                <h3 className="font-serif text-lg font-bold text-stone-900">Appointment Request Form</h3>
                <p className="text-xs text-stone-500 font-sans">Secure client integration module</p>
              </div>

              {!accessToken ? (
                // Prompt Login to Book
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <AlertCircle className="w-10 h-10 text-gold-500 mb-3" />
                  <h4 className="font-serif font-bold text-stone-800 text-sm mb-1">Calendar Authorization Required</h4>
                  <p className="text-xs text-stone-500 max-w-sm mb-6 leading-relaxed">
                    To book premium trials, we require syncing permissions with Google Calendar. 
                    Kindly connect your account using the head slider or click the trigger below.
                  </p>
                  <button
                    onClick={onLogin}
                    className="px-6 py-3 bg-amber-800 text-stone-50 hover:bg-amber-950 font-display font-medium text-xs uppercase tracking-widest rounded-full shadow transition-colors flex items-center gap-2"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    Sign In with Google to Book
                  </button>
                </div>
              ) : (
                // Active Booking Form
                <form onSubmit={handleBookingSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[11px] font-display uppercase tracking-wider text-stone-500 font-bold mb-1.5">
                        Your Custom Name *
                      </label>
                      <div className="relative">
                        <UserIcon className="absolute left-3 top-3.5 w-4 h-4 text-stone-400" />
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Abirami Karthick"
                          required
                          className="w-full text-sm py-2.5 pl-10 pr-4 bg-stone-50 border border-gold-200 rounded-xl focus:outline-none focus:border-gold-500 text-stone-800"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-display uppercase tracking-wider text-stone-500 font-bold mb-1.5">
                        WhatsApp Contact Phone *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3.5 w-4 h-4 text-stone-400" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+91 94432 XXXXX"
                          required
                          className="w-full text-sm py-2.5 pl-10 pr-4 bg-stone-50 border border-gold-200 rounded-xl focus:outline-none focus:border-gold-500 text-stone-800"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[11px] font-display uppercase tracking-wider text-stone-500 font-bold mb-1.5">
                        Email Address (For Calendar Invites) *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="abi@example.com"
                        required
                        className="w-full text-sm py-2.5 px-4 bg-stone-50 border border-gold-200 rounded-xl focus:outline-none focus:border-gold-500 text-stone-800"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-display uppercase tracking-wider text-stone-500 font-bold mb-1.5">
                        Service Custom Type *
                      </label>
                      <select
                        name="fittingType"
                        value={formData.fittingType}
                        onChange={handleInputChange}
                        className="w-full text-sm py-2.5 px-4 bg-stone-50 border border-gold-200 rounded-xl focus:outline-none focus:border-gold-500 text-stone-800"
                      >
                        <option value="Blouse Stitching">Blouse Stitching & Measurements</option>
                        <option value="Bridal Aari Work">Bridal Premium Aari Embroidery</option>
                        <option value="Premium Lehengas / Salwars">Premium Lehengas & Salwars</option>
                        <option value="General Ladies Fitting">General Ladies Dress Fitting</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[11px] font-display uppercase tracking-wider text-stone-500 font-bold mb-1.5">
                        Consultation Date *
                      </label>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        required
                        className="w-full text-sm py-2.5 px-4 bg-stone-50 border border-gold-200 rounded-xl focus:outline-none focus:border-gold-500 text-stone-800"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-display uppercase tracking-wider text-stone-500 font-bold mb-1.5">
                        Consultation Time *
                      </label>
                      <input
                        type="time"
                        name="time"
                        value={formData.time}
                        onChange={handleInputChange}
                        required
                        className="w-full text-sm py-2.5 px-4 bg-stone-50 border border-gold-200 rounded-xl focus:outline-none focus:border-gold-500 text-stone-800"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-display uppercase tracking-wider text-stone-500 font-bold mb-1.5">
                      Neck-pattern preferences, remarks or specific demands
                    </label>
                    <textarea
                      name="notes"
                      rows={3}
                      value={formData.notes}
                      onChange={handleInputChange}
                      placeholder="e.g., Heavy bridal neck design, bead work, dori hooks at the back side"
                      className="w-full text-sm py-2.5 px-4 bg-stone-50 border border-gold-200 rounded-xl focus:outline-none focus:border-gold-500 text-stone-800"
                    />
                  </div>

                  {statusMessage && (
                    <div
                      className={`text-xs p-3 rounded-lg border font-display flex items-start gap-2 ${
                        statusMessage.type === 'success'
                          ? 'bg-green-50 text-green-850 border-green-200'
                          : 'bg-red-50 text-red-850 border-red-200'
                      }`}
                    >
                      {statusMessage.type === 'success' ? (
                        <CheckCircle className="w-4 h-4 shrink-0 text-green-600 mt-0.5" />
                      ) : (
                        <AlertCircle className="w-4 h-4 shrink-0 text-red-600 mt-0.5" />
                      )}
                      <span>{statusMessage.text}</span>
                    </div>
                  )}

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 bg-amber-800 hover:bg-amber-900 font-display font-semibold text-xs uppercase tracking-widest text-stone-100 rounded-xl shadow transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {isSubmitting ? 'Verifying & Syncing Slot...' : 'Securely Book & Sync to Calendar'}
                    </button>
                    <span className="block text-center text-[10px] text-stone-400 mt-2">
                      🔒 Confirms via explicit OAuth confirmation window. No background database tracking.
                    </span>
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
