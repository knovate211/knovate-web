import EnquiryForm from '@/components/EnquiryForm';
import { Heading } from '@/components/Section';
import { site } from '@/data/site';

// "Get in touch" block at the foot of the home page: contact details, the
// shared enquiry form (leads land in the admin panel tagged home_contact) and
// a map of site.mapQuery.
export default function HomeContact() {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(site.mapQuery)}&output=embed`;
  const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.mapQuery)}`;

  return (
    <section id="contact">
      <div className="bg-[#f6e6cf] px-5 py-14 text-center">
        <Heading>Get in touch</Heading>
        <p className="mx-auto mt-4 max-w-2xl text-muted">
          We&apos;d love to hear from you! Whether you have questions, feedback, or just want to say hello, feel free to reach out.
        </p>
      </div>

      <div className="mx-auto max-w-content px-5 py-14 md:py-20">
        <dl className="mx-auto flex max-w-3xl flex-wrap justify-center gap-x-10 gap-y-3 text-center text-ink">
          <div><dt className="inline font-semibold">Email: </dt><dd className="inline"><a href={`mailto:${site.email}`} className="hover:text-gold-dark">{site.email}</a></dd></div>
          <div><dt className="inline font-semibold">Phone: </dt><dd className="inline"><a href={`tel:${site.phone.replace(/\s/g, '')}`} className="hover:text-gold-dark">{site.phone}</a></dd></div>
          <div><dt className="inline font-semibold">Location: </dt><dd className="inline">{site.location}</dd></div>
        </dl>

        <div className="mt-12 grid gap-10 md:grid-cols-2">
          <div>
            <h3 className="mb-5 font-serif text-2xl font-semibold text-ink">Contact us</h3>
            <div className="rounded-2xl border border-ink/10 bg-white p-6 shadow-[0_8px_30px_rgba(60,40,10,0.06)]">
              <EnquiryForm source="home_contact" />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="mb-5 flex items-baseline justify-between">
              <h3 className="font-serif text-2xl font-semibold text-ink">Our location</h3>
              <a href={mapLink} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-gold-dark hover:text-gold">
                Open in Maps ↗
              </a>
            </div>
            <iframe
              title={`Map of ${site.mapQuery}`}
              src={mapSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="min-h-[360px] w-full flex-1 rounded-2xl border border-ink/10"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
