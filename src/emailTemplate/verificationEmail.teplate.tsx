import { Button, Container, Html, Link, Text } from "@react-email/components";

interface VericationEmailProps {
  code: string;
  url: string;
}

export const VerificationEmailTemplate = (props: VericationEmailProps) => {
  return (
    <Html>
      <Container>
        <Text
          style={{
            textAlign: "center",
            fontFamily: "monospace",
            fontSize: "20px",
          }}
        >
          Please verify your account, Here is your code {props.code}
        </Text>
        <Link href={props.url}>Verify</Link>
      </Container>
    </Html>
  );
};
