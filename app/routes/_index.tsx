import type { MetaFunction } from "@remix-run/node";

import { useDisclosure } from '@mantine/hooks';
import { Table, Checkbox, Stack, Divider, SimpleGrid, Modal, PinInput } from "@mantine/core";
import { useState } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

type Person = {
  firstName: string;
  pin: string;
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
  { firstName: 'Paige', 'pin': '0551', 1: false, 2: true, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false, 11: false, 12: false, 13: false, 14: false, 15: false, 16: false, 17: false, 18: false, 19: false, 20: false, 21: false, 22: false, 23: false, 24: false, 25: false, 26: false, 27: false, 28: false, 29: false, 30: false, 31: false },
  { firstName: 'Grace', 'pin': '1109', 1: true, 2: true, 3: true, 4: true, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false, 11: false, 12: false, 13: false, 14: false, 15: false, 16: false, 17: false, 18: false, 19: false, 20: false, 21: false, 22: false, 23: false, 24: false, 25: false, 26: false, 27: false, 28: false, 29: false, 30: false, 31: false },
  { firstName: 'Amy', 'pin': '9366', 1: true, 2: true, 3: true, 4: true, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false, 11: false, 12: false, 13: false, 14: false, 15: false, 16: false, 17: false, 18: false, 19: false, 20: false, 21: false, 22: false, 23: false, 24: false, 25: false, 26: false, 27: false, 28: false, 29: false, 30: false, 31: false },
  { firstName: 'Amir', 'pin': '2886', 1: true, 2: true, 3: true, 4: true, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false, 11: false, 12: false, 13: false, 14: false, 15: false, 16: false, 17: false, 18: false, 19: false, 20: false, 21: false, 22: false, 23: false, 24: false, 25: false, 26: false, 27: false, 28: false, 29: false, 30: false, 31: false },
  { firstName: 'Jose', 'pin': '4623', 1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false, 11: false, 12: false, 13: false, 14: false, 15: false, 16: false, 17: false, 18: false, 19: false, 20: false, 21: false, 22: false, 23: false, 24: false, 25: false, 26: false, 27: false, 28: false, 29: false, 30: false, 31: false },
  { firstName: 'Jules', 'pin': '1640', 1: true, 2: true, 3: true, 4: true, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false, 11: false, 12: false, 13: false, 14: false, 15: false, 16: false, 17: false, 18: false, 19: false, 20: false, 21: false, 22: false, 23: false, 24: false, 25: false, 26: false, 27: false, 28: false, 29: false, 30: false, 31: false },
  { firstName: 'Brad', 'pin': '8428', 1: true, 2: true, 3: true, 4: true, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false, 11: false, 12: false, 13: false, 14: false, 15: false, 16: false, 17: false, 18: false, 19: false, 20: false, 21: false, 22: false, 23: false, 24: false, 25: false, 26: false, 27: false, 28: false, 29: false, 30: false, 31: false },
  { firstName: 'Ramon', 'pin': '8220', 1: false, 2: false, 3: true, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false, 11: false, 12: false, 13: false, 14: false, 15: false, 16: false, 17: false, 18: false, 19: false, 20: false, 21: false, 22: false, 23: false, 24: false, 25: false, 26: false, 27: false, 28: false, 29: false, 30: false, 31: false },
];

const dayColumns = [
  '1', '2', '3', '4', '5', '6', '7',
  '8', '9', '10', '11', '12', '13',
  '14', '15', '16', '17', '18', '19',
  '20', '21', '22', '23', '24', '25',
  '26', '27', '28', '29', '30', '31'
];

function GridView(props: { openModal: (person: Person) => void }) {
  const today = new Date();
  const dayNumber = parseInt(String(today.getDate()).padStart(2, '0'))
  // console.log('%cdayNumber', 'color:tomato', dayNumber)

  const rows = people.map((person) => (
    <Table.Tr key={person.firstName}>
      <Table.Td>{person.firstName}</Table.Td>
      {Object.keys(person).filter(key => key !== 'firstName' && key !== 'pin').map(key => {
      {/* {Object.keys(person).map(key => { */}
        // console.log('%ckey', 'color:tomato', typeof key)
        return (
        <Table.Td key={key}>
          <Checkbox
            color="#448C42"
            // readOnly={false}
            // checked={person[key] as boolean}
            // checked={dayNumber >= parseInt(key) ? person[key] as boolean : false}
            checked={dayNumber >= parseInt((key)) ? person[(key as any)] as boolean : false}
            onChange={() => {
              // console.log(`${person.firstName}:`, person['pin'])
              if (dayNumber === parseInt(key)) {
                props.openModal(person);
              }
            }}
            />
        </Table.Td>)
      })}
      {/* {Object.keys(member).filter(key => key !== 'firstName').map(key => {
        return <Table.Td><Checkbox checked={member[key] as boolean} color="#448C42" /></Table.Td>
      })} */}
    </Table.Tr>
  ));

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
        <Table style={{ border: "5px solid #448C42", width: "50%" }}>
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
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </main>
  )
}

function PersonModal(props: { isModalOpen: boolean, closeModal: () => void, whoseModal: null | Person }) {
  // const [opened, { open, close }] = useDisclosure(false);

  // console.log('props.isModalOpen:', props.isModalOpen, '|', props.isModalOpen)
  // console.log('%cPerson:', 'color:limegreen', props.whoseModal);

  return (
    <Modal opened={props.isModalOpen} onClose={props.closeModal} title="Verify" size="lg">
      <PinInput
        mask
        size="xl"
        type="number"
        onChange={(value) => {
          if (value === props.whoseModal?.pin) {
            console.log('%cGOT IT!', 'color:tomato', props.whoseModal.pin)}
            // props.closeModal();
          }
        }
      />
    </Modal>
  )
}

export default function Index() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const [whoseModal, setWhoseModal] = useState<null | Person>(null);

  const handleOpenModal = (person: Person) => {
    // console.log('%cperson:', 'color:turquoise', person);
    setWhoseModal(person);
    // setIsModalOpen(true);
    open();
  }

  const handleCloseModal = () => {
    close();
  }

  // const toggleOpenModal
  
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1 style={{ textAlign: "center" }}>Aládùn Pratomic Challenge</h1>
      <Divider />
      {/* <GridView openModal={handleOpenModal} />
      <PersonModal isModalOpen={isModalOpen} /> */}
      {/* =============== */}
      <GridView openModal={handleOpenModal}  />
      <PersonModal isModalOpen={opened} closeModal={handleCloseModal} whoseModal={whoseModal} />
    </div>
  );
}
