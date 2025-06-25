"use client";
import { acceptAssignmentInvite } from "@/services/assignment";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const AssignmentInvitation = () => {
  const { memberId } = useParams();
  const params = useSearchParams();
  const assignmentId = params.get("assignment");
  const email = params.get("email");
  const router = useRouter();

  useEffect(() => {
    const autoAcceptInvitation = async () => {
      try {
        const data = await acceptAssignmentInvite({ memberId, assignmentId });
        router.push(
          `/dashboard/assessments/invited?assignment=${assignmentId}&memberId=${memberId}&type=${data?.assignmentType}&email=${email}&user=member`
        );
      } catch (error) {
        console.error("Error accepting invitation:", error);
        router.push("/");
      }
    };

    autoAcceptInvitation();
  }, [memberId, assignmentId, email, router]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white">
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default AssignmentInvitation;