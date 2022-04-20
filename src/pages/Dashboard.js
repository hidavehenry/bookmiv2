import { useCollection } from '../hooks/useCollection'
import Inquiries from '../Components/Inquiries'
import { useAuthContext } from '../hooks/useAuthContext'

export default function Dashboard() {
  const { user } = useAuthContext()
  const { documents: inquiries } = useCollection('inquiries', ['uid', '==', user.uid])

  return (
    <div className="wrapper">
      <div className="cardArea">
        {!inquiries &&
        <p>No booking requests at the moment.</p>
        }
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
            status={inquery.status}
            inquery={inquery}
            />
          ))}
        </div>
        }
      </div>
    </div>
  )
}
