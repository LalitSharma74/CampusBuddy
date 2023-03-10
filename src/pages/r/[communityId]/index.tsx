import { doc, getDoc } from "firebase/firestore";

// Index/Home route of Community Page
// We can access this index route by going to localhost 3000/r/someCommunityName
import { Community } from "@/src/atoms/communitiesAtom";
import CommunityNotFound from "@/src/components/Community/CommunityNotFound";
import CreatePostLink from "../../../components/Community/CreatePostLink";
import { GetServerSidePropsContext } from "next";
import Header from "@/src/components/Community/Header";
import PageContent from "@/src/components/Layout/PageContent";
import Posts from "@/src/components/Posts/Posts";
import React from "react";
import { firestore } from "@/src/firebase/clientApp";
import safeJsonStringify from "safe-json-stringify";

type CommunityPageProps = {
  communityData: Community;
};

const CommunityPage: React.FC<CommunityPageProps> = ({ communityData }) => {
  // console.log("Here is the data", communityData);

  if (!communityData) {
    return <CommunityNotFound />;
  }
  return (
    <>
      <Header communityData={communityData} />
      <PageContent>
        {/* child1 on the left */}
        <>
          <CreatePostLink />
          <Posts communityData={communityData} />
        </>

        {/* child2 on the right */}

        <>
          <div> Right content</div>
        </>
      </PageContent>
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const communityDocRef = doc(
      firestore,
      "communities",
      context.query.communityId as string
    );

    const communityDoc = await getDoc(communityDocRef);

    return {
      props: {
        communityData: communityDoc.exists()
          ? JSON.parse(
              safeJsonStringify({
                id: communityDoc.id,
                ...communityDoc.data(),
              })
            )
          : "",
      },
    };
  } catch (error) {
    console.log("getServerSideProps error", error);
  }
}

export default CommunityPage;
