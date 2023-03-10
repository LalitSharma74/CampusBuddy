import {
  AddIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  EditIcon,
  ExternalLinkIcon,
  RepeatIcon,
} from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Wrap,
  WrapItem,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { BsArrowUpRightCircle, BsChatDots, BsWater } from "react-icons/bs";
import {
  FaBlog,
  FaHorseHead,
  FaRegPaperPlane,
  FaRobot,
  FaUserAstronaut,
  FaUserGraduate,
} from "react-icons/fa";
import { GiDeliveryDrone, GiOnTarget } from "react-icons/gi";
import { GrAdd, GrAnnounce, GrTechnology } from "react-icons/gr";
import {
  HiBuildingLibrary,
  HiOutlineClipboardDocumentList,
} from "react-icons/hi2";
import { RiMedalLine, RiRoadMapLine } from "react-icons/ri";

import { IoIosPaper } from "react-icons/io";
import Menus from "./Menus";
import React from "react";
import { SiNintendonetwork } from "react-icons/si";
import { Tooltip } from "@chakra-ui/react";
// import useDirectory from "../../../hooks/useDirectory";
import { useToast } from "@chakra-ui/react";

// import {
//   IoFilterCircleOutline,
//   IoNotificationsOutline,
//   IoVideocamOutline,
// } from "react-icons/io5";

type ActionIconsProps = {};

const ActionIcons: React.FC<ActionIconsProps> = () => {
  //   const { toggleMenuOpen } = useDirectory();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  return (
    <Flex alignItems="center" flexGrow={1}>
      {/* Left side icons */}
      <Box
        display={{ base: "none", md: "flex" }}
        alignItems="center"
        borderRight="1px solid"
        borderColor="gray.200"
      >
        {/* <Flex
          mr={1.5}
          ml={1.5}
          padding={1}
          cursor="pointer"
          borderRadius={4}
          _hover={{ bg: "gray.200" }}
        >
          <Icon as={BsArrowUpRightCircle} fontSize={20} />
        </Flex> */}
        {/* <Flex
          mr={1.5}
          ml={1.5}
          padding={1}
          cursor="pointer"
          borderRadius={4}
          _hover={{ bg: "gray.200" }}
        >
          <Icon as={IoFilterCircleOutline} fontSize={22} />
        </Flex> */}
        <Tooltip
          hasArrow
          label="Announcements"
          bg="blue.100"
          color="black"
          fontSize="lg"
        >
          <Flex
            mr={1.5}
            ml={1.5}
            padding={1}
            cursor="pointer"
            borderRadius={4}
            _hover={{ bg: "gray.200" }}
          >
            <Icon as={GrAnnounce} fontSize={20} />
          </Flex>
        </Tooltip>
        {/* <Flex
          mr={1.5}
          ml={1.5}
          padding={1}
          cursor="pointer"
          borderRadius={4}
          _hover={{ bg: "gray.200" }}
        >
          <Icon as={IoVideocamOutline} fontSize={22} />
        </Flex> */}

        <Tooltip
          hasArrow
          label="Roadmaps"
          bg="white"
          color="#217BF4"
          fontSize="lg"
        >
          <Flex
            mr={1.5}
            ml={1.5}
            padding={1}
            cursor="pointer"
            borderRadius={4}
            _hover={{ bg: "gray.200" }}
          >
            <Icon as={RiRoadMapLine} fontSize={20} />
          </Flex>
        </Tooltip>

        <Tooltip
          hasArrow
          label="Blog Section"
          bg="blue.100"
          color="black"
          fontSize="lg"
        >
          <Flex
            mr={1.5}
            ml={1.5}
            padding={1}
            cursor="pointer"
            borderRadius={4}
            _hover={{ bg: "gray.200" }}
          >
            <Icon as={FaBlog} fontSize={20} />
          </Flex>
        </Tooltip>

        <Tooltip
          hasArrow
          label="Network"
          bg="blue.100"
          color="black"
          fontSize="lg"
        >
          <Flex
            mr={1.5}
            ml={1.5}
            padding={1}
            cursor="pointer"
            borderRadius={4}
            _hover={{ bg: "gray.200" }}
          >
            <Icon as={SiNintendonetwork} fontSize={19} />
          </Flex>
        </Tooltip>

        <Tooltip
          hasArrow
          label="Opportunities"
          bg="blue.100"
          color="black"
          fontSize="lg"
        >
          <Flex
            mr={1.5}
            ml={1.5}
            padding={1}
            cursor="pointer"
            borderRadius={4}
            _hover={{ bg: "gray.200" }}
          >
            <Icon as={FaRegPaperPlane} fontSize={20} />
          </Flex>
        </Tooltip>
      </Box>

      {/* Rightside icons */}
      <Menus />
    </Flex>
  );
};
export default ActionIcons;
