import React from 'react'

const highlights = [
  {
    src: '/images/about/Icon/Technology%20Icon.png',
    title: 'Technology & Deep Tech',
    body: (
      <>
        Ph.D. in technology from the <strong>University of Oxford</strong>, with experience in
        emerging technologies and deep-tech ventures.
      </>
    ),
  },
  {
    src: '/images/about/Icon/Entrepreneurship%20Icon.png',
    title: 'Entrepreneurship & Strategy',
    body: (
      <>
        International political analyst and entrepreneur, trained at the{' '}
        <strong>Fletcher School at Tufts University</strong>, with 15+ years of leadership
        experience.
      </>
    ),
  },
  {
    src: '/images/about/Icon/Systems%20Icon.png',
    title: 'Systems Engineering',
    body: (
      <>
        Senior systems engineer trained at <strong>KTH in Sweden</strong>, with 15+ years of
        experience in wireless signal and digital systems.
      </>
    ),
  },
  {
    src: '/images/about/Icon/Advisors%20Icon.png',
    title: 'Advisors',
    body: 'Specialist expertise in computer vision, machine learning, electromagnetic energy, and fluid mechanics at leading institutions.',
  },
]

export function AboutTeam({ bodyClassName }: { bodyClassName: string }) {
  return (
    <section aria-labelledby="about-team-heading" className="team" id="about">
      <div className="team__copy">
        <div className="team__intro">
          <p className={`team__eyebrow ${bodyClassName}`}>Meet Our Team</p>
          <h2 className="team__title" id="about-team-heading">
            A multidisciplinary team with a shared mission.
          </h2>
        </div>
        <p className={`team__body ${bodyClassName}`}>
          Forte is led by engineers, researchers, and operators with global experience in deep
          technology, systems engineering, and real-world deployment.
        </p>
      </div>
      <ul className="team__list">
        {highlights.map((item) => (
          <li className="team__item" key={item.title}>
            <div className="team__heading">
              <img alt="" className="team__icon" height={48} src={item.src} width={48} />
              <h3 className={`team__label ${bodyClassName}`}>{item.title}</h3>
            </div>
            <p className={`team__detail ${bodyClassName}`}>{item.body}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
