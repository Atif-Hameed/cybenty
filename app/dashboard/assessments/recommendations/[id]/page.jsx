import Recommendation from '@/components/dashboard/assessments/recommendations'
import ErrorPage from '@/components/dashboard/shared/error-page';
import { getAssignment } from '@/services/assignment';
import React from 'react'

const page = async ({ params, searchParams }) => {

  const { id } = await params;
  const { assessmentId } = await searchParams;

  console.log(id)

  const response = await getAssignment(id)

  // if (error) {
  //   return (
  //     <div>
  //       <ErrorPage error={error} />
  //     </div>
  //   )
  // }


  return (
    <div>
      <Recommendation data={response} />
    </div>
  )
}

export default page
