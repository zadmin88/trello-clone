import { db } from "@/lib/db";

import { Separator } from "@/components/ui/separator";
import { Suspense } from "react";

import { Info } from "./_components/info";
import { BoardList } from "./_components/board-list";
// import { checkSubscription } from "@/lib/subscription";

const OrganizationIdPage = async () => {
  //   const isPro = await checkSubscription();
  const boards = await db.board.findMany();
  return (
    <div className="w-full mb-20">
      <div className="flex flex-col space-x-4"></div>
      <Info />
      <Separator className="my-4" />
      <div className="px-2 md:px-4">
        <Suspense fallback={<BoardList.Skeleton />}>
          <BoardList />
        </Suspense>
      </div>
    </div>
  );
};

export default OrganizationIdPage;
