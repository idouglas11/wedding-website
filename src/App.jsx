import { useState } from 'react'
import Hero from './components/Hero'
import Countdown from './components/Countdown'
import RSVP from './components/RSVP'
import Where from './components/Where'
import Details from './components/Details'
import Soundtrack from './components/Soundtrack'
import Gifts from './components/Gifts'
import Attendees from './components/Attendees'
import Credits from './components/Credits'

export default function App() {
  const [guestlistRefresh, setGuestlistRefresh] = useState(0)

  return (
    <div className="snap-container">
      <Hero />
      <Countdown />
      <RSVP onSubmitSuccess={() => setGuestlistRefresh(n => n + 1)} />
      <Where />
      <Details />
      <Soundtrack />
      <Gifts />
      <Attendees refreshSignal={guestlistRefresh} />
      <Credits />
    </div>
  )
}