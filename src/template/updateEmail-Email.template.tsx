import {
    Html,
    Head,
    Preview,
    Tailwind,
    Body,
    Container,
    Heading,
    Text,
    Section,
    Link,
  } from '@react-email/components';
  import * as React from 'react';
  
  export function updateEmail({
    name,
    token,
  }: {
    name: string;
    token: string;
  }) {
    return (
      <Html>
        <Head />
        <Preview>Update Email</Preview>
        <Tailwind>
          <Body className="bg-gray-100 text-black">
            <Container className="mx-auto my-10 p-6 bg-white shadow-md rounded-lg max-w-md">
              {/* Logo */}
              <Section className="text-center mb-4">
                <img
                  src="https://jiecfjdtkfoxhjwgvulu.supabase.co/storage/v1/object/public/Ecommerce//nestjs-icon-2048x2040-3rrvcej8.png"
                  alt="nestjs Logo"
                  className="mx-auto h-10"
                />
              </Section>
  
              {/* Título */}
              <Heading className="text-xl font-semibold text-center">
                Account Verification
              </Heading>
  
              {/* Contenido */}
              <Text className="text-md">Hi <strong>{name}</strong>,</Text>
              <Text className="text-md">
                Thank you for starting the process of creating a new Ecommerce account. We want to make sure it's really you.
                Please press the verification link below. If you do not want to create an account, you can ignore this message.
                This link will expire in <strong>1 hour</strong>.
              </Text>
              <Section className="text-center mt-4">
                <Link
                  href={`${process.env.UPDATE_EMAIL_TOKEN_URL}${token}`}
                  className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md"
                >
                  Verify Your Email
                </Link>
              </Section>
  
              <Text className="font-semibold mt-4">Thank you.</Text>
  
              {/* Línea divisoria */}
              <hr className="my-4 border-gray-300" />
  
              {/* Pie de página */}
              <Text className="text-sm text-gray-500">
                LinkedIn -{' '}
                <Link
                  href="https://www.linkedin.com/in/victor-martinez30"
                  className="text-blue-600"
                >
                  Victor Martinez
                </Link>
              </Text>
            </Container>
          </Body>
        </Tailwind>
      </Html>
    );
  }
  
  export default updateEmail;
  