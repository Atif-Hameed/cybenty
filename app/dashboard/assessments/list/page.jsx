'use client'
import { allCompletedAssignedAssessemnts } from '@/actions/assessments.action'
import AssessmentList from '@/components/dashboard/assessments/assessment-table'
import { redirect } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const Page = () => {
  const [assigned, setAssigned] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(50); // Fixed limit matching frontend itemsPerPage
  const user = useSelector((state) => state.user.user);

  const getAllAssignmentsAssessments = async (userId, page, limit) => {
    setLoading(true);
    try {
      const res = await allCompletedAssignedAssessemnts(userId, page, limit);
      if (res.error) {
        throw new Error(res.error);
      }
      const { data } = res.data || {};
      const { assigned = { items: [], pagination: {} } } = data || {};
      // Filter to only include completed assignments
      const completedAssignments = assigned.items.filter(
        assignment => assignment.status === 'COMPLETED'
      );

      setAssigned(completedAssignments);
      setTotalPages(assigned.pagination.totalPages || 1);
      setCurrentPage(assigned.pagination.currentPage || 1);
    } catch (error) {
      console.error('Error fetching assessments:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?._id) {
      getAllAssignmentsAssessments(user._id, currentPage, limit);
    }
  }, [user, currentPage, limit]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return (
      <h1 className='pt-20 font-semibold text-center'>Loading...</h1>
    );
  }

  return (
    <div>
      <AssessmentList
        data={assigned}
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};

export default Page;