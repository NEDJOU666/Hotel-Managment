import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import emailjs from 'emailjs-com';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

// Import Images
import TresorImage from './assets/Tresor.jpg';
import verlaineImage from './assets/Verlaine.jpg';
import ClacksonImage from './assets/Clackson.jpg';
import FaysalImage from './assets/Faysal.jpg';
import KaderImage from './assets/Kader.jpg';
import OsaImage from './assets/Osa.jpg';
import GroupImage from './assets/123.jpg';


// Styled Components
const Container = styled.div`
  background-color: #f4f4f4;
  padding: 20px;
  text-align: center;
`;

const Title = styled.h1`
  color: #4caf50;
  margin-bottom: 20px;
  font-size: 2rem;
`;

const TeamContainer = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
`;

const ArrowButton = styled.button`
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: #4caf50;

  &:hover {
    color: #388e3c;
  }
`;

const TeamCard = styled(motion.div)`
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 250px;
  text-align: center;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

const TeamImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
`;

const TeamName = styled.h2`
  color: #333;
  margin: 10px 0;
  font-size: 1.2rem;
`;

const TeamRole = styled.p`
  color: #777;
  font-size: 1rem;
`;

const TeamDescription = styled.p`
  color: #555;
  padding: 10px;
  font-size: 0.9rem;
`;

const ReportContainer = styled.div`
  background-color: #ffffff;
  padding: 20px;
  text-align: center;
  margin-top: 40px;
`;

const ReportContent = styled(motion.div)`
  background: #e0f2f1;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 1000px;
  margin: 0 auto;
  text-align: left;
`;

const SectionTitle = styled.h2`
  color: #333;
  margin-bottom: 10px;
`;

const Text = styled.p`
  color: #555;
  margin-bottom: 20px;
`;

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const TextArea = styled.textarea`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  min-height: 100px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #388e3c;
  }
`;

const GroupImageStyled = styled.img`
  width: 250px;
  height: 300px;
  margin-right: 20px;
  object-fit: cover;
`;

// Team Members Data
const teamMembers = [
  {
    name: 'Nedjou Destin Tresor',
    role: 'Group Leader',
    image: TresorImage.src,
    description: 'Tresor leads the team with a vision for innovative solutions, did the fontend cunstruction for the Booking, Customer, Account,Report.',
  },
  {
    name: 'Mbuna Verlaine Claude',
    role: 'Fontend',
    image: verlaineImage.src,
    description: 'Verlaine designs stunning visuals and interfaces created the Pricing Fontend.',
  },
  {
    name: 'Clackson',
    role: 'Backend Developer',
    image: ClacksonImage.src,
    description: 'Clackson manages all backend functionalities seamlessly, The one who came with the code structure and idea did the Backend using Sanity and Dashboard.',
  },
  {
    name: 'Fayssal',
    role: 'Fontend Developer',
    image: FaysalImage.src,
    description: 'Fayssal ensures the admmition of woker the construction for the Staff Fontend.',
  },
  {
    name: 'Kader',
    role: 'Fontend Developer',
    image: KaderImage.src,
    description: 'Kader specializes in the managment of the Room and Activities Fontend.',
  },
  {
    name: 'Osa',
    role: 'Fontend Developer',
    image: OsaImage.src,
    description: 'Osa handles the creation of all the Login Pages present and the Employees Section.',
  },
];

const Pages: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const form = useRef<HTMLFormElement | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % teamMembers.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + teamMembers.length) % teamMembers.length);
  };

  // Function to send email
  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.current) return;

    emailjs.sendForm('service_ku2hi4a', 'template_66p21ck', form.current!, 'kLd5010kTB-v-MB4C')
      .then(
        () => {
          setStatusMessage('Your message has been sent successfully!');
          form.current?.reset();
        },
        () => {
          setStatusMessage('There was an error sending your message. Please try again later.');
        }
      );
  };

  return (
    <>
      {/* About Us Section */}
      <Container>
        <Title>Meet Our Team</Title>
        <TeamContainer>
          {/* New Group Image displayed outside the TeamCard */}
          <GroupImageStyled src={GroupImage} alt="Group Picture" />
          
          <ArrowButton onClick={handlePrev}>
            <AiOutlineLeft />
          </ArrowButton>

          <TeamCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <TeamImage src={teamMembers[currentIndex].image} alt={teamMembers[currentIndex].name} />
            <TeamName>{teamMembers[currentIndex].name}</TeamName>
            <TeamRole>{teamMembers[currentIndex].role}</TeamRole>
            <TeamDescription>
              {teamMembers[currentIndex].description}
            </TeamDescription>
          </TeamCard>

          <ArrowButton onClick={handleNext}>
            <AiOutlineRight />
          </ArrowButton>
        </TeamContainer>
      </Container>

      {/* Report Section */}
      <ReportContainer>
        <Title>Monthly Report</Title>
        <ReportContent
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <SectionTitle>Summary</SectionTitle>
          <Text>
            This is a summary of the monthly report. It includes key performance metrics, financial summaries, and more.
          </Text>

          {/* Updated Contact Us Form */}
          <SectionTitle>Contact Us</SectionTitle>
          <Text>If you have any questions or problems, please reach out via the form below:</Text>
          <ContactForm ref={form} onSubmit={sendEmail}>
            <Input type="text" name="customer_name" placeholder="Your Name" required />
            <Input type="email" name="customer_email" placeholder="Your Email" required />
            <Input type="text" name="customer_phone" placeholder="Your Phone Number" required />
            <Input type="text" name="issue_type" placeholder="Issue Type" required />
            <TextArea name="issue_description" placeholder="Describe your issue" required />
            <Input type="text" name="assigned_to" placeholder="Assigned To (e.g., Front Desk Manager)" required />
            <Input type="text" name="urgency" placeholder="Urgency Level (High, Medium, Low)" required />
            <TextArea name="action_notes" placeholder="Action Notes" required />
            <Button type="submit">Send Message</Button>
          </ContactForm>

          {/* Status Message */}
          {statusMessage && <Text>{statusMessage}</Text>}
        </ReportContent>
      </ReportContainer>
    </>
  );
};

export default Pages;
