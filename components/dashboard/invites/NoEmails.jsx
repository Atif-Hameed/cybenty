import { useRouter } from "next/navigation";
import { FiPlus } from "react-icons/fi";
import Image from "next/image";
import email from '@/public/assets/images/emails.jpg'

const NoEmails = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col space-y-3 items-center w-full">
      <Image alt="" src={email} width={250} height={250} />
      <span className="font-semibold text-xl">
        You haven&apos;t added any email addresses yet.
      </span>
      <span className="text-sm text-black text-opacity-50 font-light">
        All of your account leak result will be displayed here.
      </span>

      <button
        onClick={() => router.push('/dashboard/tools/password-checker')}
        className="bg-purple text-white px-4 sm:w-auto w-full py-2 rounded-lg"
      >
        <span className="flex items-center w-full gap-2 md:text-xl">
          <FiPlus className="w-4" />
          <p>Add Email Address</p>
        </span>
      </button>
    </div>
  );
};

export default NoEmails;
