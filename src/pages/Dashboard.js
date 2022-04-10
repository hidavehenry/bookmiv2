import { useCollection } from '../hooks/useCollection'
import Inquiries from '../Components/Inquiries'
import { useAuthContext } from '../hooks/useAuthContext'

export default function Dashboard() {
  const { user } = useAuthContext()
  const { documents: inquiries } = useCollection('inquiries', ['uid', '==', user.uid])

  return (
    <div className="wrapper">
      <div className="cardArea">
        <h2>Booking Requests:</h2>
        {inquiries && 
        <div>
          {inquiries.map(inquery  => (
            <Inquiries
            key={inquery.id}
            name={inquery.name}
            date={inquery.date}
            venue={inquery.venue}
            address={inquery.address}
            length={inquery.length}
            details={inquery.details}
            contactName={inquery.contactName}
            contactEmail={inquery.contactEmail}
            inquery={inquery}
            />
          ))}
        </div>
        }
      </div>
    </div>
  )
}
