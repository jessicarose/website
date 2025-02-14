import React from 'react'
import SEO from '../components/seo'
import Layout from '../containers/layout'
import Sponsors from '../components/Sponsors'
import Info from '../components/Info'
import Speakers from '../components/Speakers'
import Organizers from '../components/Organizers'
import Attendees from '../components/Attendees'
import Thanks from '../components/Thanks'
import Panel from '../components/Panel'
import Heading from '../components/Heading'
import Announcement from '../components/Announcement'

const Main = ({ city, attendees }) => {
  const { site, thanks, speakers, sponsors, info, mainOrganizer, announcement } = city
  const hasHeading = !site.fullDescription
    ? {
        heading: 'What?'
      }
    : {}
  return (
    <Layout>
      <SEO
        title={`QueerJS - ${info.city}`}
        description={'A meetup for everyone where Queer Speakers take the stage'}
      />
      <section>
        <Heading sub="queerjs @">{info.city}</Heading>
        {announcement && <Announcement message={announcement} />}
        <Info attendeesNumber={attendees.length} site={site} info={info} city={info.link} />
        <Panel {...hasHeading}>
          {site.customDescription ? (
            <div
              className="custom-desc"
              dangerouslySetInnerHTML={{ __html: site.customDescription }}
            />
          ) : (
            <p>
              QueerJS is a meetup series where everyone is encouraged to attend and support the speakers and the idea.
              <br />
              If you're queer and want to speak this meetup is for you! It exists to give you a voice and to make a safe space where everyone is welcome.
            </p>
          )}
          <p>
            Join us! There will be {info.food ? 'food and' : ''} stickers{' '}
            <span role="img" aria-label="Queer Rainbow">
              🌈
            </span>
          </p>
        </Panel>
        {speakers.length > 0 || site.cfp ? (
          <Panel heading="Speakers">
            <Speakers cfp={site.cfp} speakers={speakers.filter((s) => !s.mc)} />
          </Panel>
        ) : null}
        {speakers.filter((s) => s.mc).length ? (
          <Panel heading="MC">
            <Speakers noSpeak cfp={site.cfp} speakers={speakers.filter((s) => s.mc)} />
          </Panel>
        ) : null}
        {!site.rsvpLink ? (
          <Panel heading={`Attendees (${attendees.length})`}>
            <Attendees attendees={attendees} />
          </Panel>
        ) : null}
        {sponsors && (
          <Panel heading="Sponsors">
            <Sponsors sponsors={sponsors} />
          </Panel>
        )}
        {mainOrganizer && mainOrganizer.length > 0 ? (
          <Panel heading={mainOrganizer.length > 1 ? 'Organizers' : 'Organizer'}>
            <Organizers organizers={mainOrganizer} />
          </Panel>
        ) : null}
      </section>

      <Panel heading={thanks && thanks.length ? 'Special Thanks' : null}>
        <Thanks thanks={thanks || []} />
      </Panel>
    </Layout>
  )
}

export default Main
