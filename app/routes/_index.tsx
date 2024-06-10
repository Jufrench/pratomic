import React, { useEffect, useState } from "react";

import { useLoaderData } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";

import { useDisclosure } from '@mantine/hooks';
import { lighten, Table, Checkbox, Stack, Divider, SimpleGrid, Modal,
  PinInput, Notification, Center, Button, Alert } from "@mantine/core";
import { IconExclamationCircle, IconExclamationMark, IconCheck, IconInfoSquare } from '@tabler/icons-react';
// import { getStudents } from "~/data";
import supabase from "~/utils/supabase";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async () => {
  const { data: students, error } = await supabase
    .from('students')
    .select('*');

  console.log('data:', students)
  if (error) {
    console.log('error:', error.message)
  }

  return {
    students
  }
};

type Person = {
  firstName: string;
  pin: string;
  color?: string;
  [key: number]: string | boolean | number;
}

// const people: Person[] = [
//   { firstName: 'Paige', pin: '0551', '1': false, '2': true, '3': false, '4': false, '5': false, '6': false, '7': false, '8': false, '9': false, '10': false, '11': false, '12': false, '13': false, '14': false, '15': false, '16': false, '17': false, '18': false, '19': false, '20': false, '21': false, '22': false, '23': false, '24': false, '25': false, '26': false, '27': false, '28': false, '29': false, '30': false, '31': false },
//   { firstName: 'Grace', pin: '1109', '1': true, '2': true, '3': true, '4': false, '5': false, '6': false, '7': false, '8': false, '9': false, '10': false, '11': false, '12': false, '13': false, '14': false, '15': false, '16': false, '17': false, '18': false, '19': false, '20': false, '21': false, '22': false, '23': false, '24': false, '25': false, '26': false, '27': false, '28': false, '29': false, '30': false, '31': false },
//   { firstName: 'Amy', pin: '9366', '1': true, '2': true, '3': true, '4': false, '5': false, '6': false, '7': false, '8': false, '9': false, '10': false, '11': false, '12': false, '13': false, '14': false, '15': false, '16': false, '17': false, '18': false, '19': false, '20': false, '21': false, '22': false, '23': false, '24': false, '25': false, '26': false, '27': false, '28': false, '29': false, '30': false, '31': false },
//   { firstName: 'Amir', pin: '2886', '1': true, '2': true, '3': true, '4': false, '5': false, '6': false, '7': false, '8': false, '9': false, '10': false, '11': false, '12': false, '13': false, '14': false, '15': false, '16': false, '17': false, '18': false, '19': false, '20': false, '21': false, '22': false, '23': false, '24': false, '25': false, '26': false, '27': false, '28': false, '29': false, '30': false, '31': false },
//   { firstName: 'Jose', pin: '4623', '1': false, '2': false, '3': false, '4': false, '5': false, '6': false, '7': false, '8': false, '9': false, '10': false, '11': false, '12': false, '13': false, '14': false, '15': false, '16': false, '17': false, '18': false, '19': false, '20': false, '21': false, '22': false, '23': false, '24': false, '25': false, '26': false, '27': false, '28': false, '29': false, '30': false, '31': false },
//   { firstName: 'Jules', pin: '1640', '1': true, '2': true, '3': true, '4': false, '5': false, '6': false, '7': false, '8': false, '9': false, '10': false, '11': false, '12': false, '13': false, '14': false, '15': false, '16': false, '17': false, '18': false, '19': false, '20': false, '21': false, '22': false, '23': false, '24': false, '25': false, '26': false, '27': false, '28': false, '29': false, '30': false, '31': false },
//   { firstName: 'Brad', pin: '8428', '1': true, '2': true, '3': true, '4': false, '5': false, '6': false, '7': false, '8': false, '9': false, '10': false, '11': false, '12': false, '13': false, '14': false, '15': false, '16': false, '17': false, '18': false, '19': false, '20': false, '21': false, '22': false, '23': false, '24': false, '25': false, '26': false, '27': false, '28': false, '29': false, '30': false, '31': false },
//   { firstName: 'Ramon', pin: '8220', '1': false, '2': false, '3': true, '4': false, '5': false, '6': false, '7': false, '8': false, '9': false, '10': false, '11': false, '12': false, '13': false, '14': false, '15': false, '16': false, '17': false, '18': false, '19': false, '20': false, '21': false, '22': false, '23': false, '24': false, '25': false, '26': false, '27': false, '28': false, '29': false, '30': false, '31': false },
// ];

const people: Person[] = [
  { firstName: 'Paige', 'pin': '0551', 1: false, 2: true, 3: false, 4: false, 5: false, 6: true, 7: false, 8: false, 9: false, 10: false, 11: false, 12: false, 13: false, 14: false, 15: false, 16: false, 17: false, 18: false, 19: false, 20: false, 21: false, 22: false, 23: false, 24: false, 25: false, 26: false, 27: false, 28: false, 29: false, 30: false },
  { firstName: 'Grace', 'pin': '1109', color: 'skyblue', 1: true, 2: true, 3: true, 4: true, 5: true, 6: true, 7: true, 8: true, 9: false, 10: false, 11: false, 12: false, 13: false, 14: false, 15: false, 16: false, 17: false, 18: false, 19: false, 20: false, 21: false, 22: false, 23: false, 24: false, 25: false, 26: false, 27: false, 28: false, 29: false, 30: false },
  { firstName: 'Amy', 'pin': '9366', color: 'gold', 1: true, 2: true, 3: true, 4: true, 5: true, 6: true, 7: true, 8: true, 9: false, 10: false, 11: false, 12: false, 13: false, 14: false, 15: false, 16: false, 17: false, 18: false, 19: false, 20: false, 21: false, 22: false, 23: false, 24: false, 25: false, 26: false, 27: false, 28: false, 29: false, 30: false },
  { firstName: 'Amir', 'pin': '2886', 1: true, 2: true, 3: true, 4: true, 5: true, 6: true, 7: true, 8: true, 9: false, 10: false, 11: false, 12: false, 13: false, 14: false, 15: false, 16: false, 17: false, 18: false, 19: false, 20: false, 21: false, 22: false, 23: false, 24: false, 25: false, 26: false, 27: false, 28: false, 29: false, 30: false },
  // { firstName: 'Jose', 'pin': '4623', 1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false, 11: false, 12: false, 13: false, 14: false, 15: false, 16: false, 17: false, 18: false, 19: false, 20: false, 21: false, 22: false, 23: false, 24: false, 25: false, 26: false, 27: false, 28: false, 29: false, 30: false },
  { firstName: 'Jules', 'pin': '1640', color: '#F2AA52', 1: true, 2: true, 3: true, 4: true, 5: true, 6: true, 7: true, 8: true, 9: false, 10: false, 11: false, 12: false, 13: false, 14: false, 15: false, 16: false, 17: false, 18: false, 19: false, 20: false, 21: false, 22: false, 23: false, 24: false, 25: false, 26: false, 27: false, 28: false, 29: false, 30: false },
  { firstName: 'Brad', 'pin': '8428', color: '#448C42', 1: true, 2: true, 3: true, 4: true, 5: true, 6: true, 7: true, 8: true, 9: false, 10: false, 11: false, 12: false, 13: false, 14: false, 15: false, 16: false, 17: false, 18: false, 19: false, 20: false, 21: false, 22: false, 23: false, 24: false, 25: false, 26: false, 27: false, 28: false, 29: false, 30: false },
  { firstName: 'Ramon', 'pin': '8220', 1: false, 2: false, 3: true, 4: false, 5: false, 6: true, 7: true, 8: true, 9: false, 10: false, 11: false, 12: false, 13: false, 14: false, 15: false, 16: false, 17: false, 18: false, 19: false, 20: false, 21: false, 22: false, 23: false, 24: false, 25: false, 26: false, 27: false, 28: false, 29: false, 30: false },
];

const dayColumns = [
  '1', '2', '3', '4', '5', '6', '7',
  '8', '9', '10', '11', '12', '13',
  '14', '15', '16', '17', '18', '19',
  '20', '21', '22', '23', '24', '25',
  '26', '27', '28', '29', '30'
];

function GridView(props: { openModal: (person: Person) => void }) {
  const today = new Date();
  const dayNumber = parseInt(String(today.getDate()).padStart(2, '0'))
  // console.log('%cdayNumber', 'color:tomato', dayNumber)

  const rows = people.map((person) => (
    <Table.Tr key={person.firstName}>
      <Table.Td>{person.firstName}</Table.Td>
      {Object.keys(person).filter(key => key !== 'firstName' && key !== 'pin' && key !== 'color').map(key => {
        return (
        <Table.Td key={key}>
          <Checkbox
            color={person.color ? person.color : 'gray'}
            checked={dayNumber >= parseInt((key)) ? person[(key as any)] as boolean : false}
            onChange={() => {
              if (dayNumber === parseInt(key)) {
                props.openModal(person);
              }
            }}
            />
        </Table.Td>)
      })}
    </Table.Tr>
  ));

  const { students } = useLoaderData() as { students: [] };
  console.log('%cstudents', 'background:teal', students)

  const studentRows = students.map((student: { first_name: string, color: string }, index: number) => {
    return (
      <React.Fragment key={index}>
        <StudentRow student={student} openModal={props.openModal} />
      </React.Fragment>
    )
  })

  // console.log('%cstudentRows:', 'background:brown', studentRows)

  return (
    <main
      style={{
        height: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "black",
        color: "white",
      }}>
      <Table.ScrollContainer minWidth={500} style={{ width: "70%" }}>
        <Table style={{ border: "5px solid gray", width: "50%" }}>
          <Table.Thead></Table.Thead>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Name</Table.Th>
              {/* <Table.Th>Today</Table.Th> */}
              {dayColumns.map(column => (
                <Table.Th key={column}>June {column}</Table.Th>
              ))}
            </Table.Tr>
          </Table.Thead>
          {/* <Table.Tbody>{rows}</Table.Tbody> */}
          <Table.Tbody>{studentRows}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </main>
  )
}

function UpdateButton(props: { whoseModal: { first_name: string } }) {
  const today = new Date();
  const dayNumber = parseInt(String(today.getDate()).padStart(2, '0'));
  const successIcon = <IconCheck />

  const [loading, { toggle }] = useDisclosure();
  const [didUpdateSucceed, setDidUpdateSucceed] = useState<boolean | undefined>(undefined);

  const handleUpdateLog = async () => {
    const { status, error } = await supabase
      .from('students')
      .update({ [dayNumber]: true })
      .eq('first_name', props.whoseModal?.first_name)
      
    if (status === 204) {
      setDidUpdateSucceed(true);
      toggle();
      console.log('loading:', loading)
    }
    if (error !== null) setDidUpdateSucceed(false);
  }

  useEffect(() => {
    if (didUpdateSucceed) toggle();
  }, [didUpdateSucceed])

  return (
    <Stack>
      <Button
        size="lg"
        color="#448C42"
        loading={loading}
        leftSection={didUpdateSucceed && successIcon}
        style={{ pointerEvents: didUpdateSucceed ? 'none' : 'unset' }}
        onClick={() => {
          toggle();
          handleUpdateLog();
        }}>
        {didUpdateSucceed ? "Update Successful!" : `Update: ${today.toDateString()}`}
      </Button>
      {didUpdateSucceed &&
        <Alert
          title="Refresh the page to see updates."
          icon={<IconInfoSquare />}
          color="#F2AA52"
          variant="light" />}
    </Stack>
  )
}

function StudentModal(props: { isModalOpen: boolean, closeModal: () => void, whoseModal: null | any }) {
  // const [opened, { open, close }] = useDisclosure(false);
  // const [loading, { toggle }] = useDisclosure();

  // const [isCorrectPin, setIsCorrectPin] = useState<boolean | null>(null);
  // const [showNotification, setShowNotification] = useState<boolean | null>(true);
  // const [didUpdateSucceed, setDidUpdateSucceed] = useState<boolean | undefined>(undefined);
  
  // const exclamationMark = <IconExclamationMark />

  // const today = new Date();
  // const dayNumber = parseInt(String(today.getDate()).padStart(2, '0'));

  // const successIcon = <IconCheck />
  
  // const handleUpdateLog = async () => {
  //   const { status, error } = await supabase
  //     .from('students')
  //     .update({ [dayNumber]: true })
  //     .eq('first_name', props.whoseModal?.first_name)
      
  //   if (status === 204) {
  //     setDidUpdateSucceed(true);
  //     toggle();
  //     console.log('loading:', loading)
  //   }
  //   if (error !== null) setDidUpdateSucceed(false);
  // }

  // console.log(today.toDateString())

  // useEffect(() => {
  //   if (didUpdateSucceed) toggle();
  // }, [didUpdateSucceed])

  const [studentVerified, setStudentVerified] = useState<boolean | undefined>(false);
  const [incorrectPin, setIncorrectPin] = useState<boolean | undefined>(undefined);
  const [showIncorrectPinAlert, setShowIncorrectPinAlert] = useState<boolean>(false);
  console.log('%cwhoseModal:', 'color:tomato', props.whoseModal)

  return (
    <Modal
      size="lg"
      opened={props.isModalOpen}
      onClose={props.closeModal}
      title={`Hi ${props.whoseModal?.first_name}, please verify yourself.`}>
      <Center>
        <Stack>
          {!studentVerified &&
            <PinInput
              mask
              size="xl"
              type="number"
              style={{ justifyContent: "center" }}
              onChange={(value) => {
                console.log(typeof value)
                if (value === props.whoseModal?.pin) {
                  console.log('%cGOT IT!', 'color:tomato', props.whoseModal.pin)
                  setStudentVerified(true);
                  setShowIncorrectPinAlert(false);
                  return;
                }
                if (value.length === 4 && value !== props.whoseModal?.pin) {
                  setIncorrectPin(true);
                  setShowIncorrectPinAlert(true);
                }
                if (value.length === 0) {
                  setIncorrectPin(undefined);
                  setShowIncorrectPinAlert(false);
                }
              }}
          />}
          {studentVerified && <UpdateButton whoseModal={props.whoseModal} />}
          {showIncorrectPinAlert &&
            <Alert
              title="Ah Dang! Incorrect pin. Try again!"
              color="#BF3939"
              withCloseButton
              icon={<IconExclamationCircle />}
              onClose={() => setShowIncorrectPinAlert(false)} />}
        </Stack>
      </Center>
    </Modal>
  )
}

// function StudentRow({ params }: any ) {
function StudentRow(props: {
    student: { first_name: string, color: string }
    openModal: (student: any) => void
  }) {
  // console.log('%cstudent:', 'color:fuchsia', props.student)

  const today = new Date();
  const dayNumber = parseInt(String(today.getDate()).padStart(2, '0'))

  return (
    <Table.Tr>
      <Table.Td>{props.student.first_name}</Table.Td>
      {Object.keys(props.student)
        .filter(column => column != 'first_name' && column !== 'color' && column !== 'pin' )
        .map(column => {
          // console.log('%ccolumn:', 'color:tomato', column)
          return (
            <Table.Td key={column}>
              <Checkbox
                color={props.student.color ? props.student.color : 'gray'}
                checked={dayNumber >= parseInt((column)) ? (props.student as any)[(column as any)] as boolean : false}
                onChange={() => {
                  if (dayNumber === parseInt(column)) {
                    props.openModal(props.student);
                  }
                }}
                />
            </Table.Td>
          )
        })}
      {/* {Object.keys(person).filter(key => key !== 'firstName' && key !== 'pin' && key !== 'color').map(key => {
        return (
        <Table.Td key={key}>
          <Checkbox
            color={props.student.color ? person.color : 'gray'}
            checked={dayNumber >= parseInt((key)) ? person[(key as any)] as boolean : false}
            onChange={() => {
              if (dayNumber === parseInt(key)) {
                props.openModal(person);
              }
            }}
            />
        </Table.Td>)
      })} */}
    </Table.Tr>
  )
}

export default function Index() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const [whoseModal, setWhoseModal] = useState<null | Person>(null);

  const handleOpenModal = (student: any) => {
    // console.log('%cperson:', 'color:turquoise', person);
    setWhoseModal(student);
    // setIsModalOpen(true);
    open();
  }

  const handleCloseModal = () => {
    close();
  }
  
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1 style={{ textAlign: "center" }}>Aládùn Pratomic Challenge</h1>
      {/* {students.map((student: { first_name: string }, index: number) => {
        return (
          <React.Fragment key={index}>
            <StudentRow student={student} />
          </React.Fragment>
        )
      })} */}
      <Divider />
      {/* <GridView openModal={handleOpenModal} />
      <StudentModal isModalOpen={isModalOpen} /> */}
      {/* =============== */}
      <GridView openModal={handleOpenModal}  />
      <StudentModal isModalOpen={opened} closeModal={handleCloseModal} whoseModal={whoseModal} />
    </div>
  );
}
