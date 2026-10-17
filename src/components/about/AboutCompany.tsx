import { Link } from 'react-router-dom'
import { routes } from '@/app/routes'
import { PageProse } from '@/components/content/PageProse'
import prose from '@/components/content/PageProse.module.css'
import { siteSeller } from '@/data/siteSeller'
import { SITE_NAME } from '@/utils/constants'

export function AboutCompany() {
  return (
    <PageProse>
      <h2 className={prose.title}>About the company</h2>
      <p>
        {SITE_NAME} is the official online store for WWII reference books by Igor Donchik. The seller
        published for payment onboarding is {siteSeller.legalName}.
      </p>
      <p>
        <strong>BIN / IIN:</strong> {siteSeller.binIin}
        <br />
        <strong>Legal address:</strong> {siteSeller.legalAddress}
        <br />
        <strong>Dispatch warehouse:</strong> {siteSeller.shippingAddress}
        <br />
        <strong>Phone:</strong> {siteSeller.phone}
        <br />
        <strong>Email:</strong> {siteSeller.email}
      </p>
      <p>
        Public offer, privacy policy, and service terms are available in the site footer and on the{' '}
        <Link to={routes.offer}>Public offer</Link>, <Link to={routes.privacy}>Privacy policy</Link>, and{' '}
        <Link to={routes.terms}>Terms of service</Link> pages.
      </p>
    </PageProse>
  )
}
