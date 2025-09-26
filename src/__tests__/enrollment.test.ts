import { describe, it, expect } from 'vitest';
import { z } from 'zod';

// Test the enrollment schema validation
const enrollmentSchema = z.object({
  studentName: z.string()
    .min(1, 'Student name is required')
    .refine(val => val.trim().split(' ').length >= 2, 'Please enter full name (minimum 2 words)'),
  
  email: z.string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  
  phone: z.string()
    .min(1, 'Phone number is required')
    .refine(val => {
      const indiaPattern = /^[6-9]\d{9}$/;
      const e164Pattern = /^\+?[1-9]\d{1,14}$/;
      return indiaPattern.test(val) || e164Pattern.test(val);
    }, 'Please enter a valid phone number'),
  
  age: z.number()
    .min(5, 'Age must be at least 5')
    .max(99, 'Age must be less than 100'),
  
  guardianName: z.string().optional(),
  guardianPhone: z.string().optional(),
  
  program: z.enum(['Beginner', 'Intermediate', 'Advanced', 'MAX']),
  intent: z.enum(['Enrol now', 'Trial', 'Counselling']),
  accessibilityNeeds: z.string().optional(),
  message: z.string().min(20, 'Please provide at least 20 characters describing your goals'),
  consent: z.boolean().refine(val => val === true, 'You must agree to be contacted'),
  website: z.string().optional()
}).refine(data => {
  if (data.age < 18) {
    return data.guardianName && data.guardianName.trim().length > 0 && 
           data.guardianPhone && data.guardianPhone.trim().length > 0;
  }
  return true;
}, {
  message: 'Guardian info required for under 18',
  path: ['guardianName']
});

describe('Enrollment Form Validation', () => {
  describe('Student Name', () => {
    it('should require student name', () => {
      const result = enrollmentSchema.safeParse({
        studentName: '',
        email: 'test@example.com',
        phone: '9876543210',
        age: 25,
        program: 'Beginner',
        intent: 'Enrol now',
        message: 'This is a test message with more than 20 characters',
        consent: true
      });
      
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Student name is required');
      }
    });

    it('should require minimum 2 words in name', () => {
      const result = enrollmentSchema.safeParse({
        studentName: 'John',
        email: 'test@example.com',
        phone: '9876543210',
        age: 25,
        program: 'Beginner',
        intent: 'Enrol now',
        message: 'This is a test message with more than 20 characters',
        consent: true
      });
      
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Please enter full name (minimum 2 words)');
      }
    });

    it('should accept valid full name', () => {
      const result = enrollmentSchema.safeParse({
        studentName: 'John Doe',
        email: 'test@example.com',
        phone: '9876543210',
        age: 25,
        program: 'Beginner',
        intent: 'Enrol now',
        message: 'This is a test message with more than 20 characters',
        consent: true
      });
      
      expect(result.success).toBe(true);
    });
  });

  describe('Email Validation', () => {
    it('should require email', () => {
      const result = enrollmentSchema.safeParse({
        studentName: 'John Doe',
        email: '',
        phone: '9876543210',
        age: 25,
        program: 'Beginner',
        intent: 'Enrol now',
        message: 'This is a test message with more than 20 characters',
        consent: true
      });
      
      expect(result.success).toBe(false);
    });

    it('should validate email format', () => {
      const result = enrollmentSchema.safeParse({
        studentName: 'John Doe',
        email: 'invalid-email',
        phone: '9876543210',
        age: 25,
        program: 'Beginner',
        intent: 'Enrol now',
        message: 'This is a test message with more than 20 characters',
        consent: true
      });
      
      expect(result.success).toBe(false);
    });

    it('should accept valid email', () => {
      const result = enrollmentSchema.safeParse({
        studentName: 'John Doe',
        email: 'john.doe@example.com',
        phone: '9876543210',
        age: 25,
        program: 'Beginner',
        intent: 'Enrol now',
        message: 'This is a test message with more than 20 characters',
        consent: true
      });
      
      expect(result.success).toBe(true);
    });
  });

  describe('Phone Validation', () => {
    it('should accept valid India mobile number', () => {
      const result = enrollmentSchema.safeParse({
        studentName: 'John Doe',
        email: 'test@example.com',
        phone: '9876543210',
        age: 25,
        program: 'Beginner',
        intent: 'Enrol now',
        message: 'This is a test message with more than 20 characters',
        consent: true
      });
      
      expect(result.success).toBe(true);
    });

    it('should accept valid India mobile with spaces', () => {
      const result = enrollmentSchema.safeParse({
        studentName: 'John Doe',
        email: 'test@example.com',
        phone: '98765 43210',
        age: 25,
        program: 'Beginner',
        intent: 'Enrol now',
        message: 'This is a test message with more than 20 characters',
        consent: true
      });
      
      expect(result.success).toBe(true);
    });

    it('should accept valid E.164 format', () => {
      const result = enrollmentSchema.safeParse({
        studentName: 'John Doe',
        email: 'test@example.com',
        phone: '+919876543210',
        age: 25,
        program: 'Beginner',
        intent: 'Enrol now',
        message: 'This is a test message with more than 20 characters',
        consent: true
      });
      
      expect(result.success).toBe(true);
    });

    it('should reject random numbers', () => {
      const result = enrollmentSchema.safeParse({
        studentName: 'John Doe',
        email: 'test@example.com',
        phone: '123',
        age: 25,
        program: 'Beginner',
        intent: 'Enrol now',
        message: 'This is a test message with more than 20 characters',
        consent: true
      });
      
      expect(result.success).toBe(false);
    });

    it('should reject phone starting with invalid digits', () => {
      const result = enrollmentSchema.safeParse({
        studentName: 'John Doe',
        email: 'test@example.com',
        phone: '1234567890',
        age: 25,
        program: 'Beginner',
        intent: 'Enrol now',
        message: 'This is a test message with more than 20 characters',
        consent: true
      });
      
      expect(result.success).toBe(false);
    });

    it('should reject phone with wrong length', () => {
      const result = enrollmentSchema.safeParse({
        studentName: 'John Doe',
        email: 'test@example.com',
        phone: '98765432101',
        age: 25,
        program: 'Beginner',
        intent: 'Enrol now',
        message: 'This is a test message with more than 20 characters',
        consent: true
      });
      
      expect(result.success).toBe(false);
    });
  });

  describe('Age Validation', () => {
    it('should require age between 5 and 99', () => {
      const resultTooYoung = enrollmentSchema.safeParse({
        studentName: 'John Doe',
        email: 'test@example.com',
        phone: '9876543210',
        age: 3,
        program: 'Beginner',
        intent: 'Enrol now',
        message: 'This is a test message with more than 20 characters',
        consent: true
      });
      
      expect(resultTooYoung.success).toBe(false);

      const resultTooOld = enrollmentSchema.safeParse({
        studentName: 'John Doe',
        email: 'test@example.com',
        phone: '9876543210',
        age: 101,
        program: 'Beginner',
        intent: 'Enrol now',
        message: 'This is a test message with more than 20 characters',
        consent: true
      });
      
      expect(resultTooOld.success).toBe(false);
    });
  });

  describe('Guardian Information', () => {
    it('should require guardian info for under 18', () => {
      const result = enrollmentSchema.safeParse({
        studentName: 'John Doe',
        email: 'test@example.com',
        phone: '9876543210',
        age: 16,
        program: 'Beginner',
        intent: 'Enrol now',
        message: 'This is a test message with more than 20 characters',
        consent: true
      });
      
      expect(result.success).toBe(false);
    });

    it('should accept guardian info for under 18', () => {
      const result = enrollmentSchema.safeParse({
        studentName: 'John Doe',
        email: 'test@example.com',
        phone: '9876543210',
        age: 16,
        guardianName: 'Jane Doe',
        guardianPhone: '9876543211',
        program: 'Beginner',
        intent: 'Enrol now',
        message: 'This is a test message with more than 20 characters',
        consent: true
      });
      
      expect(result.success).toBe(true);
    });

    it('should not require guardian info for 18+', () => {
      const result = enrollmentSchema.safeParse({
        studentName: 'John Doe',
        email: 'test@example.com',
        phone: '9876543210',
        age: 18,
        program: 'Beginner',
        intent: 'Enrol now',
        message: 'This is a test message with more than 20 characters',
        consent: true
      });
      
      expect(result.success).toBe(true);
    });
  });

  describe('Consent', () => {
    it('should require consent to be true', () => {
      const result = enrollmentSchema.safeParse({
        studentName: 'John Doe',
        email: 'test@example.com',
        phone: '9876543210',
        age: 25,
        program: 'Beginner',
        intent: 'Enrol now',
        message: 'This is a test message with more than 20 characters',
        consent: false
      });
      
      expect(result.success).toBe(false);
    });
  });
});