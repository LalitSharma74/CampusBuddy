// Index/Home route of Community Page
// We can access this index route by going to localhost 3000/r/someCommunityName
import { Community } from "@/src/atoms/communitiesAtom";
import CommunityNotFound from "@/src/components/Community/CommunityNotFound";
import Header from "@/src/components/Community/Header";
import PageContent from "@/src/components/Layout/PageContent";
import { firestore } from "@/src/firebase/clientApp";
import { doc, getDoc } from "firebase/firestore";
import { GetServerSidePropsContext } from "next";
import React from "react";
import safeJsonStringify from "safe-json-stringify";

type CommunityPageProps = {
  communityData: Community;
};

const CommunityPage: React.FC<CommunityPageProps> = ({ communityData }) => {
  console.log("Here is the data", communityData);

  if (!communityData) {
    return <CommunityNotFound />;
  }
  return (
    <>
      <Header communityData={communityData} />
      <PageContent>
        {/* child1 on the left */}
        <>
          <div>LHS</div>
          <div>HELLO</div>
          <div>HELLO</div>
          <div>HELLO</div>
          <div>HELLO</div>
        </>

        {/* child2 on the right*/}
        <>
          <div>RHS</div>
          <div>HELLO</div>
          <div>HELLO</div>
          <div>HELLO</div>
          <div>HELLO</div>
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
