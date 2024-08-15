import Chat from "./Chat"

const Apps_service = ({index}:any) => {
  return (
    <>
    {
        index == 0 && (
            <Chat/>
        )
    }
    </>
  )
}

export default Apps_service
