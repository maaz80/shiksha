import Template from '../../assets/shiksha-template-image.webp';
import Template2 from '../../assets/template.webp';

const ImageCollage = () => {
     return (
          <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4'>
               <img src={Template} alt="Template Image" loading="lazy" decoding="async" className='w-full h-auto' />
               <img width={400}
                    height={225}
                    src={Template2} alt="Template Image" loading="lazy" decoding="async" className='w-full h-72.5' />
               <img src={Template} alt="Template Image" loading="lazy" decoding="async" className='w-full h-auto' />
               <img width={400}
                    height={225}
                    src={Template2} alt="Template Image" loading="lazy" decoding="async" className='w-full h-72.5' />
               <img width={400}
                    height={225}
                    src={Template2} alt="Template Image" loading="lazy" decoding="async" className='w-full h-72.5 object-cover' />
               <img src={Template} alt="Template Image" loading="lazy" decoding="async" className='w-full h-auto' />
               <img width={400}
                    height={225}
                    src={Template2} alt="Template Image" loading="lazy" decoding="async" className='w-full h-72.5 object-cover' />
               <img src={Template} alt="Template Image" loading="lazy" decoding="async" className='w-full h-auto' />
          </div>
     )
}

export default ImageCollage