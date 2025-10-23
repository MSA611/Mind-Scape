import { useRef, useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";
import { Modal } from "@chakra-ui/react";
import NoteFunctions from "../zustand";

const ModalComponent = ({ onClose, isOpen }) => {
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const toast = useToast();

  const { authUser, updateUserData } = NoteFunctions();

  const [information, setInformation] = useState({
    fullName: authUser.fullName,
    profilePic: "",
  });

  const handleUpdate = async (e) => {
    e.preventDefault();
    const { success, message } = await updateUserData(information);
    if (success) {
      toast({
        title: "Update",
        duration: 3000,
        status: "success",
        isClosable: true,
        descripition: message,
      });
    } else {
      toast({
        title: "Update",
        duration: 3000,
        status: "error",
        isClosable: true,
        descripition: message,
      });
    }
  };
  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create your account</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>FullName</FormLabel>
            <Input
              ref={initialRef}
              value={information.fullName}
              onChange={(e) =>
                setInformation({ ...information, fullName: e.target.value })
              }
              placeholder="First name"
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Update Profile</FormLabel>
            <Input
              placeholder="updateProfile.."
              onChange={(e) =>
                setInformation({ ...information, profilePic: e.target.value })
              }
              type="file"
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button onClick={handleUpdate} colorScheme="blue" mr={3}>
            Update
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalComponent;
