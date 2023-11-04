import { Button } from '@react-email/button'
import { Heading } from '@react-email/heading'
import { Hr } from '@react-email/hr'
import { Html } from '@react-email/html'
import { Text } from '@react-email/text'

const ForgotPasswordEmail = ({ params }) => {
  console.log(params)
  return (
    <Html>
      <Heading as='h1'> Hello {params.name}</Heading>
      <Text>
        We recieved the reset password request. If it's not you then please
        ignore it
      </Text>
      <Button
        href={params.url}
        style={{ background: 'rgb(59, 200, 230)', color: '#FFFFFF' }}
        pX={20}
        pY={20}
      >
        Reset Password
      </Button>
      <Hr />
      <Heading as='h3'> Regards</Heading>
      <Text>Powered by Sterling Digitals Ltd.</Text>
    </Html>
  )
}

export default ForgotPasswordEmail
