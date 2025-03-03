import React from 'react'
import DiseaseCard from './DiseaseCard'
import tuberculosis from '../../../Images/Diseases/Pi7_tuberculosis.png'
import appendix from '../../../Images/Diseases/Pi7_appendix.png'
import tumour from '../../../Images/Diseases/Pi7_tumour.png'
import diabetes from '../../../Images/Diseases/Pi7_diabetes.png'
import transplant from '../../../Images/Diseases/Pi7_transplant.png'
import surgery from '../../../Images/Diseases/Pi7_surgery.png'
function Disease() {
    return (
        <div className='w-[90%] flex place-content-center place-items-center my-20 py-20 bg-slate-200'>
            <div className='w-[70%] flex flex-wrap gap-8 justify-evenly'>
                <DiseaseCard image={tuberculosis} title={"Tuberculosis"} />
                <DiseaseCard image={appendix} title={"Appendix"} />
                <DiseaseCard image={transplant} title={"Organ Transplant"} />
                <DiseaseCard image={tumour} title={"Brain Tumour"} />
                <DiseaseCard image={diabetes} title={"Diabetes"} />
                <DiseaseCard image={surgery} title={"Plastic Surgery"} />
            </div>
        </div>
    )
}

export default Disease
