import React from 'react'
import DiseaseCard from './DiseaseCard'
import tuberculosis from '../../../Images/Diseases/Pi7_tuberculosis.png'
import appendix from '../../../Images/Diseases/Pi7_appendix.png'
import tumour from '../../../Images/Diseases/Pi7_tumour.png'
import diabetes from '../../../Images/Diseases/Pi7_diabetes.png'
import transplant from '../../../Images/Diseases/Pi7_transplant.png'
import surgery from '../../../Images/Diseases/Pi7_surgery.png'
import alzheimer from '../../../Images/Diseases/Pi7_alzheimer.png'
import malaria from '../../../Images/Diseases/Pi7_malaria.png'
function Disease() {
    return (
        <div className='w-[90%] flex place-content-center place-items-center lg:my-10 md:my-7 review:my-4 my-0 bg-transparent lg:py-20 md:py-16 sm:py-10 py-8 '>
            <div className=' md:w-[90%] w-[100%] flex flex-col lg:gap-10 md:gap-8 sm:gap-5 gap-3  justify-evenly'>
                <div className="row1 flex justify-evenly lg:gap-10 md:gap-8 sm:gap-5 gap-3">
                    <DiseaseCard image={tuberculosis} title={"Tuberculosis"} />
                    <DiseaseCard image={appendix} title={"Appendix"} />
                    <DiseaseCard image={transplant} title={"Organ Transplant"} />
                    <DiseaseCard image={tumour} title={"Brain Tumour"} />
                </div>
                <div className="row2 flex justify-evenly lg:gap-10 md:gap-8 sm:gap-5 gap-3">
                    <DiseaseCard image={diabetes} title={"Diabetes"} />
                    <DiseaseCard image={surgery} title={"Plastic Surgery"} />
                    <DiseaseCard image={alzheimer} title={"Alzheimer"} />
                    <DiseaseCard image={malaria} title={"Malaria"} />
                </div>
            </div>
        </div>
    )
}

export default Disease
