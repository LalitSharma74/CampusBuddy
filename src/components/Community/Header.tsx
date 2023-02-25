import { Community } from "@/src/atoms/communitiesAtom";
import { Box, Button, Flex, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { FaReddit } from "react-icons/fa";

import useCommunityData from "@/src/hooks/useCommunityData";

type HeaderProps = {
  communityData: Community;
};

/**
 * !!!Don't pass communityData boolean until the end
 * It's a small optimization!!!
 */

const Header: React.FC<HeaderProps> = ({ communityData }) => {
  // console.log(communityData);

  const { communityStateValue, onJoinOrLeaveCommunity, loading } =
    useCommunityData();
  const isJoined = !!communityStateValue?.mySnippets.find(
    (item) => item.communityId === communityData.id
  ); // read from our communitysnippets
  return (
    <Flex direction="column" width="100%" height="146px">
      {/* Upper blue half of the header  */}
      <Box height="50%" bg="blue.400" />
      <Flex justify="center" bg="white" flexGrow={1}>
        <Flex width="95%" maxWidth="860px">
          {communityData.imageUrl ? (
            <Image src={communityData.imageUrl} />
          ) : (
            <Icon
              as={FaReddit}
              fontSize={64}
              position="relative"
              top={-3}
              color="blue.500"
              border="4px solid white"
              borderRadius="50%"
            />
          )}
          <Flex padding="10px 16px">
            <Flex direction="column" mr={6}>
              <Text fontWeight={800} fontSize="16pt">
                {communityData.id}
              </Text>
              <Text fontWeight={600} fontSize="10pt" color="gray.400">
                r/{communityData.id}
              </Text>
            </Flex>

            <Button
              variant={isJoined ? "outline" : "solid"}
              height="30px"
              pr={6}
              pl={6}
              onClick={() => onJoinOrLeaveCommunity(communityData, isJoined)} //  Join the user to the community if they are not in itm or remove the user of they are already joined but before that we should have a whole idea that user is already in the community or not
              // we need to get those snippets from our database so that we could know that the user is in the community or not
              isLoading={loading} // loading from the hook
            >
              {isJoined ? "Joined" : "Join"}
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Header;
