'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import Pagination from '@/components/shared/Pagination';
import Heading from '@/components/shared/Heading';
import Button from '../shared/Button';
import Link from 'next/link';
import { getTeamResults } from '@/actions/game.action';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import Modal from '../shared/Modal';
import CompletedDetails from './completed-details';

const AssessmentList = ({ data, currentPage, totalPages, handlePageChange }) => {
  const [openPopupIndex, setOpenPopupIndex] = useState(null);
  const [openDetails, setOpenDetails] = useState(false);
  const [assignmentId, setAssignmentId] = useState(null);
  const [assessmentId, setAssessmentId] = useState(null);
  const [teamScore, setTeamScore] = useState(null);
  const [soloData, setSoloData] = useState(null);
  const [logo, setLogo] = useState(null);

  const togglePopup = (index) => {
    setOpenPopupIndex(openPopupIndex === index ? null : index);
  };

  const handleOutsideClick = (e) => {
    if (!e.target.closest('.popup-content')) {
      setOpenPopupIndex(null);
    }
  };

  const openDetailModel = (assignId, assessId, score, logoOrSoloData, isSolo = false) => {
    if (isSolo) {
      setSoloData(logoOrSoloData);
      setAssignmentId(null);
      setAssessmentId(null);
      setTeamScore(null);
      setLogo(null);
    } else {
      setAssignmentId(assignId);
      setAssessmentId(assessId);
      setTeamScore(score);
      setLogo(logoOrSoloData);
      setSoloData(null);
    }
    setOpenDetails(true);
  };

  const closeDetailModel = () => {
    setAssessmentId(null);
    setAssignmentId(null);
    setSoloData(null);
    setTeamScore(null);
    setOpenDetails(false);
  };

  const router = useRouter();

  useEffect(() => {
    if (openPopupIndex !== null) {
      document.addEventListener('click', handleOutsideClick);
    } else {
      document.removeEventListener('click', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [openPopupIndex]);

  return (
    <div className='p-6'>
      <div className='flex items-center justify-between w-full'>
        <div>
          <Heading>
            <span className='text-darkBlue'>Assessments</span>
          </Heading>
          <p className='text-gray'>Completed</p>
        </div>
        <Button onClick={() => router.push('/dashboard/assessments')} label={'Take Assessment'} />
      </div>

      <div className="overflow-x-auto mt-6">
        <table className="min-w-full bg-white rounded-xl border border-bordered p-2">
          <thead className="bg-[#FCFDFD] rounded-xl">
            <tr className='border-b border-bordered rounded-t-xl bg-[#FCFDFD] text-black'>
              <th className="p-4 text-start text-sm whitespace-nowrap">Assessment Name</th>
              <th className="p-4 text-start text-sm whitespace-nowrap">Type</th>
              <th className="p-4 text-center text-sm whitespace-nowrap">Questions</th>
              <th className="p-4 text-start text-sm whitespace-nowrap">Points</th>
              <th className="p-4 text-start text-sm whitespace-nowrap">Status</th>
              <th className="p-4 text-start text-sm whitespace-nowrap">Recommendations</th>
              <th className="p-4 text-start text-sm whitespace-nowrap">Report</th>
              <th className="p-4 text-start rounded-tr-xl text-sm whitespace-nowrap">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((e, i) => (
                <tr key={i} className={`${i < data.length - 1 ? 'border-b-2' : 'border-none'} border-bordered text-gray`}>
                  <td className="px-4 sm:pr-4 pr-6 py-3 whitespace-nowrap text-sm gap-2">
                    {e.assessmentId.assessmentName}
                  </td>
                  <td className="px-4 sm:pr-4 pr-6 py-3 whitespace-nowrap text-sm text-start">
                    {e.assignmentType}
                  </td>
                  <td className="px-4 sm:pr-4 pr-6 py-3 whitespace-nowrap text-sm text-center">
                    {e.assignmentType === 'TEAM' ? '-' : (
                      <span>
                        <span className='text-primary font-medium'>{e.correctAnswers}</span>
                        /
                        <span className='text-primary font-medium'>{e.totalQuestions}</span>
                      </span>
                    )}
                  </td>
                  <td className="px-4 sm:pr-4 pr-6 py-3 whitespace-nowrap text-sm text-start">
                    <span className='text-primary font-medium'>{e.score}</span>
                  </td>
                  <td className="px-4 sm:pr-4 py-3 whitespace-nowrap text-sm text-start">
                    <div className={`w-[90%] px-3 flex justify-center py-1 rounded-md bg-[#3AFF7112] text-[#16CE4A]`}>
                      {e.status}
                    </div>
                  </td>
                  <td className="px-4 sm:pr-4 pr-6 py-3 whitespace-nowrap text-sm text-start">
                    <Link href={`/dashboard/assessments/recommendations/${e._id}?assessmentId=${e.assessmentId._id}`} className='text-gray cursor-pointer'>
                      View Recommendation
                    </Link>
                  </td>
                  <td className="px-4 sm:pr-4 pr-6 py-3 whitespace-nowrap text-sm relative">
                    <Link href={`/dashboard/assessments/report`} className='cursor-pointer'>View Report</Link>
                  </td>
                  <td className="px-4 sm:pr-4 pr-6 py-3 whitespace-nowrap sm:text-base text-sm relative">
                    <button
                      className='w-fit rounded-lg bg-[#fcae6644] px-1 py-0.5'
                      onClick={() => togglePopup(i)}
                    >
                      <BiDotsHorizontalRounded className='text-3xl rotate-90 text-[#FCAE66]' />
                    </button>
                    {openPopupIndex === i && (
                      <div className={`absolute ${i == data.length - 1 ? 'bottom-4' : 'top-5'} right-20 mt-2 bg-white text-sm rounded-lg shadow-lg space-y-2 z-10 p-2 popup-content`}>
                        <button
                          onClick={() => {
                            console.log(e.assignmentType);
                            if (e.assignmentType === 'SOLO') {
                              openDetailModel(null, null, e.scorePercentage, e, true);
                            } else {
                              openDetailModel(e._id, e.assessmentId._id, e.scorePercentage, e.assessmentId.logo);
                            }
                          }}
                          className='cursor-pointer flex items-center gap-2 w-16 text-[#FCAE66] bg-[#FFE8E2] px-2 py-1 rounded'
                        >
                          View
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-4">
                  NO ASSESSMENT FOUND
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className='flex items-center justify-center mt-4'>
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            handlePageChange={handlePageChange}
            className={'sm:mb-4 mb-4'}
          />
        </div>

        <Modal isOpen={openDetails} onClose={closeDetailModel}>
          <CompletedDetails
            assignemntId={assignmentId}
            assessmentId={assessmentId}
            teamScore={teamScore}
            logo={logo}
            soloData={soloData}
          />
        </Modal>
      </div>
    </div>
  );
};

export default AssessmentList;