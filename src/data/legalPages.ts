import { SITE_NAME } from '@/utils/constants'
import { siteSeller } from './siteSeller'

export type LegalDocId = 'offer' | 'privacy' | 'terms'

export interface LegalSection {
  title: string
  paragraphs: string[]
}

export interface LegalDocument {
  id: LegalDocId
  path: string
  title: string
  seoTitle: string
  seoDescription: string
  intro: string
  sections: LegalSection[]
}

const sellerLine = `${siteSeller.legalName}. ${siteSeller.binIin}. Email: ${siteSeller.email}. Phone: ${siteSeller.phone}.`

export const legalDocuments: Record<LegalDocId, LegalDocument> = {
  offer: {
    id: 'offer',
    path: '/offer',
    title: 'Public offer',
    seoTitle: 'Public Offer',
    seoDescription: `Public offer to buy WWII reference books from ${SITE_NAME}.`,
    intro:
      'This public offer (temporary draft for payment onboarding) sets out the terms on which Igor Donchik Art sells printed reference books through donchikart.com. Placing an order means you accept these terms.',
    sections: [
      {
        title: '1. Seller',
        paragraphs: [
          sellerLine,
          `Brand / website: ${SITE_NAME} (${siteSeller.shippingAddress} — dispatch warehouse).`,
          siteSeller.note,
        ],
      },
      {
        title: '2. Goods',
        paragraphs: [
          'The store sells printed WWII reference books and related discount bundles as described on each product page: title, description, specifications, price, and availability.',
          'Coming-soon titles are not offered for sale until they are marked available.',
          'Sale copies with minor cover wear are sold as-is and are described as such on the Discounts page.',
        ],
      },
      {
        title: '3. Prices and payment',
        paragraphs: [
          'Catalogue prices are shown in Kazakhstani tenge (KZT). An approximate euro equivalent may appear in parentheses for international readers.',
          'The amount charged at checkout is confirmed on the payment page of the selected provider (card acquiring / other methods once connected).',
          'EU VAT, if applicable, is shown at checkout. Outside the EU the listed price is the amount you pay before carrier import duties, if any.',
        ],
      },
      {
        title: '4. Ordering',
        paragraphs: [
          'An order is placed when you submit checkout with a valid delivery address and contact details, including a phone number in international format required by the carrier.',
          'We may cancel an order if the book is out of stock, payment fails, or the delivery address is in a region we do not serve.',
        ],
      },
      {
        title: '5. Delivery',
        paragraphs: [
          'Orders are packed in Estonia and usually leave once a week via Omniva with tracking, in a rigid carton with protective wrap.',
          'We do not ship to the Russian Federation or Belarus.',
          'Selected Panzer Camouflage volumes may include a collector shipping offer as stated on the product page.',
        ],
      },
      {
        title: '6. Cancellation, returns, and sale copies',
        paragraphs: [
          'Before dispatch you may ask to cancel by writing to the sales email. After dispatch, returns of undamaged standard editions are handled case by case — contact sales within 14 days of delivery.',
          'Discounted sale copies with noted cover defects are final sale: no refund and no exchange.',
          'If a parcel arrives damaged, keep the packaging and contact sales with photos so we can resolve the claim with the carrier.',
        ],
      },
      {
        title: '7. Contact',
        paragraphs: [
          `Sales: ${siteSeller.email}. Phone: ${siteSeller.phone}.`,
          'This draft will be replaced with the client’s final legal wording when provided.',
        ],
      },
    ],
  },
  privacy: {
    id: 'privacy',
    path: '/privacy',
    title: 'Privacy policy',
    seoTitle: 'Privacy Policy',
    seoDescription: `How ${SITE_NAME} processes personal data for orders and support.`,
    intro:
      'This privacy policy (temporary draft for payment onboarding) explains what personal data we collect when you use donchikart.com and how we use it.',
    sections: [
      {
        title: '1. Controller',
        paragraphs: [sellerLine, siteSeller.note],
      },
      {
        title: '2. Data we collect',
        paragraphs: [
          'Order and checkout data: name, delivery address, phone, email, and order contents.',
          'Technical data needed to run the site: basic device/browser information and cookies required for cart and session.',
          'Messages you send to our sales or studio email.',
        ],
      },
      {
        title: '3. Why we use data',
        paragraphs: [
          'To fulfil orders, pack and ship books, and handle payments through the payment provider.',
          'To answer support, returns, and research questions.',
          'To keep legally required accounting and tax records.',
        ],
      },
      {
        title: '4. Sharing',
        paragraphs: [
          'We share data with carriers (for delivery), payment providers (for charging), and hosting/email tools needed to operate the shop.',
          'We do not sell your personal data.',
        ],
      },
      {
        title: '5. Retention and rights',
        paragraphs: [
          'Order records are kept as long as required for accounting and dispute resolution.',
          'You may request access, correction, or deletion of personal data where the law allows, by writing to the sales email.',
        ],
      },
      {
        title: '6. Contact',
        paragraphs: [
          `Privacy requests: ${siteSeller.email}.`,
          'This draft will be replaced with the client’s final legal wording when provided.',
        ],
      },
    ],
  },
  terms: {
    id: 'terms',
    path: '/terms',
    title: 'Terms of service',
    seoTitle: 'Payment, Delivery, Cancellation and Returns',
    seoDescription: `Payment, delivery, cancellation and return terms for ${SITE_NAME}.`,
    intro:
      'These service terms (temporary draft for payment onboarding) summarise payment, delivery, cancellation, and returns for books bought on donchikart.com. They work together with the Public Offer.',
    sections: [
      {
        title: '1. Payment',
        paragraphs: [
          'Prices are displayed primarily in KZT; a foreign-currency equivalent may appear in parentheses.',
          'Payment is completed through the connected acquiring / checkout provider. An order is paid when the provider confirms a successful charge.',
          'If payment fails, the order is not dispatched.',
        ],
      },
      {
        title: '2. Order cancellation',
        paragraphs: [
          'Before the parcel is handed to the carrier, email sales to cancel. We refund successful charges according to the payment provider’s timelines.',
          'We may cancel if stock is unavailable, the address cannot be served, or fraud checks fail.',
        ],
      },
      {
        title: '3. Delivery',
        paragraphs: [
          'Dispatch from Estonia, typically weekly, with Omniva tracking and protective packing.',
          'Delivery times depend on the destination country and the carrier. Import taxes outside the EU are the buyer’s responsibility unless stated otherwise.',
          'No shipping to the Russian Federation or Belarus.',
        ],
      },
      {
        title: '4. Returns and refunds',
        paragraphs: [
          'Standard editions: contact sales within 14 days of delivery if you wish to discuss a return of an unused book in original condition.',
          'Sale / defect copies: non-refundable and non-exchangeable once purchased, as stated on the Discounts page.',
          'Damaged-in-transit parcels: report with photos; we will help with a replacement or refund where the claim is confirmed.',
        ],
      },
      {
        title: '5. Seller contact',
        paragraphs: [sellerLine, `Warehouse / shipping: ${siteSeller.shippingAddress}.`],
      },
    ],
  },
}

export const legalNavLinks: Array<{ id: LegalDocId; label: string; to: string }> = [
  { id: 'offer', label: 'Public offer', to: legalDocuments.offer.path },
  { id: 'privacy', label: 'Privacy policy', to: legalDocuments.privacy.path },
  { id: 'terms', label: 'Terms of service', to: legalDocuments.terms.path },
]
