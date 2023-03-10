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
import { HiAcademicCap, HiCurrencyDollar } from "react-icons/hi";
import {
  HiBuildingLibrary,
  HiOutlineClipboardDocumentList,
} from "react-icons/hi2";
import {
  IoFilterCircleOutline,
  IoNotificationsOutline,
  IoVideocamOutline,
} from "react-icons/io5";
import { MdDeveloperMode, MdSportsScore } from "react-icons/md";
import { RiMedalLine, RiRoadMapLine } from "react-icons/ri";
import { SiCodechef, SiCodeproject } from "react-icons/si";

import { IoIosPaper } from "react-icons/io";
import React from "react";

type MenusProps = {};

const Menus: React.FC<MenusProps> = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      {/* <Flex
      mr={1.5}
      ml={1.5}
      padding={1}
      cursor="pointer"
      borderRadius={4}
      _hover={{ bg: "gray.200" }}
    >
      <Icon as={BsChatDots} fontSize={20} />
    </Flex> */}

      {/* <Tooltip
      hasArrow
      label="Academic Resources"
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
        <Icon as={HiAcademicCap} fontSize={26} />
      </Flex>
    </Tooltip> */}

      <Flex
        mr={1.5}
        ml={1.5}
        padding={1}
        cursor="pointer"
        borderRadius={4}
        //   _hover={{ bg: "gray.200" }}
        // bg="blue.400"
      >
        <Menu>
          <MenuButton
            variant="ghost"
            _hover={{ bg: useColorModeValue("gray.100", "gray.700") }}
            // borderRadius="md"
            // borderWidth="1px"
            aria-label="Courses"
            fontWeight="normal"
            onMouseEnter={onOpen}
            onMouseLeave={onClose}
          >
            Clubs {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
          </MenuButton>
          <MenuList onMouseEnter={onOpen} onMouseLeave={onClose}>
            <MenuItem>
              <Icon as={FaRobot} fontSize={22} mr={2} mt={-0.5} /> AMU ROBOCLUB
            </MenuItem>

            <MenuItem>
              <Icon as={BsWater} fontSize={20} mr={2} mt={-0.5} />
              AUV ZHCET
            </MenuItem>

            <MenuItem>
              <Icon as={MdDeveloperMode} fontSize={20} mr={2} mt={-0.5} />
              GDSC
            </MenuItem>

            <MenuItem>
              <Icon as={HiCurrencyDollar} fontSize={20} mr={2} mt={-0.5} />
              EDC
            </MenuItem>

            <MenuItem>
              <Icon as={SiCodechef} fontSize={18} mr={2} mt={-0.5} />
              CODECHEF
            </MenuItem>
            <MenuItem>
              <Icon as={GiDeliveryDrone} fontSize={18} mr={2} mt={-0.5} />
              UAV
            </MenuItem>

            {/* <p>University Clubs</p> */}

            {/* <MenuItem>
              <Icon as={FaHorseHead} fontSize={18} mr={2} mt={-0.5} />
              Horse Riding
            </MenuItem>

            <MenuItem>
              <Icon as={HiBuildingLibrary} fontSize={18} mr={2} mt={-0.5} />
              Cultural Education Center (CEC)
            </MenuItem>
            <MenuItem>
              <Icon as={GiOnTarget} fontSize={18} mr={2} mt={-0.5} />
              RCA
            </MenuItem> */}
          </MenuList>
        </Menu>
      </Flex>

      <Flex
        mr={1.5}
        ml={1.5}
        padding={1}
        cursor="pointer"
        borderRadius={4}
        //   _hover={{ bg: "gray.200" }}
        // bg="blue.400"
      >
        <Menu>
          <MenuButton
            variant="ghost"
            _hover={{ bg: useColorModeValue("gray.100", "gray.700") }}
            // borderRadius="md"
            // borderWidth="1px"
            aria-label="Courses"
            fontWeight="normal"
            onMouseEnter={onOpen}
            onMouseLeave={onClose}
          >
            Events {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
          </MenuButton>
          <MenuList>
            <MenuItem>
              <Icon as={HiBuildingLibrary} fontSize={22} mr={2} mt={-0.5} /> AMU
              Cultural
            </MenuItem>

            <MenuItem>
              <Icon as={MdSportsScore} fontSize={20} mr={2} mt={-0.5} />
              Sports
            </MenuItem>

            <MenuItem>
              <Icon as={GrTechnology} fontSize={18} mr={2} mt={-0.5} />
              Technical
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>

      <Flex
        mr={1.5}
        ml={1.5}
        padding={1}
        cursor="pointer"
        borderRadius={4}
        //   _hover={{ bg: "gray.200" }}
      >
        <Menu>
          <MenuButton
            // px={4}
            // py={2}
            // transition="all 0.2s"
            // borderRadius="md"
            // borderWidth="1px"
            // _hover={{ bg: "gray.400" }}
            // _expanded={{ bg: "blue.400" }}
            // _focus={{ boxShadow: "outline" }}
            // onMouseEnter={onOpen}
            // onMouseLeave={onClose}

            variant="ghost"
            _hover={{ bg: useColorModeValue("gray.100", "gray.700") }}
            // borderRadius="md"
            // borderWidth="1px"
            aria-label="Courses"
            fontWeight="normal"
            onMouseEnter={onOpen}
            onMouseLeave={onClose}
          >
            Resources {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
          </MenuButton>
          <MenuList>
            <MenuItem>
              <Icon as={IoIosPaper} mr={2} mt={-0.5} fontSize={24} />
              End Sem PYP's
            </MenuItem>
            <MenuItem>
              <Icon as={RiMedalLine} mr={2} mt={-0.5} fontSize={24} />
              Gate Material
            </MenuItem>
            {/* <MenuDivider /> */}
            <MenuItem>
              <Icon
                as={HiOutlineClipboardDocumentList}
                fontSize={24}
                mr={2}
                mt={-0.5}
              />
              Lab Readings
            </MenuItem>

            <MenuItem>
              <Icon as={SiCodeproject} fontSize={24} mr={2} mt={-0.5} />
              Projects
            </MenuItem>

            {/* <MenuItem></MenuItem> */}
          </MenuList>
        </Menu>
      </Flex>

      <Flex
        mr={1.5}
        ml={1.5}
        padding={1}
        cursor="pointer"
        borderRadius={4}
        _hover={{ bg: "gray.200" }}
      >
        <Icon as={IoNotificationsOutline} fontSize={20} />
      </Flex>
      <Flex
        display={{ base: "none", md: "flex" }}
        mr={3}
        ml={1.5}
        padding={1}
        cursor="pointer"
        borderRadius={4}
        _hover={{ bg: "gray.200" }}
        // onClick={toggleMenuOpen}
      >
        <Icon as={GrAdd} fontSize={20} />
      </Flex>
    </>
  );
};
export default Menus;
