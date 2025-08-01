// Contact service for handling contact form submissions
export interface Contact {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  phone: string;
  source: string;
  createdDate: string;
}

export interface ContactCreateDTO {
  name: string;
  email: string;
  subject: string;
  message: string;
  phone: string;
  source?: string;
}

class ContactService {
  private baseUrl = 'https://localhost:7222/api/contact';

  // Submit contact form
  async submitContact(contact: ContactCreateDTO): Promise<Contact> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contact)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result.contact;
    } catch (error) {
      console.error('Error submitting contact form:', error);
      throw error;
    }
  }
}

// Create a singleton instance
export const contactService = new ContactService(); 