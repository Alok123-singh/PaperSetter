import React from 'react';
import { useForm } from 'react-hook-form';
import { Input, Button } from '../index';

function OverlayForm({ onClose, onSubmit, formData, parentData }) {

    const { register, handleSubmit } = useForm();

    const addCourse = (data) => {
        onSubmit(data);
        onClose();
    };

    const handleClickOutside = (event) => {
        if (event.target.classList.contains('modal-overlay')) {
          onClose();
        }
    };

    return (
        <div className=" fixed top-0 left-0 w-[100%] h-[100%] flex justify-center items-center z-1000 modal-overlay bg-black bg-opacity-50 z-50" style={{backgroundColor : 'rgba(0, 0, 0, 0.5)'}} onClick={handleClickOutside}>
            <div className=" relative w-1/2 bg-white p-[20px] rounded-md z-1001">
                <div className='space-y-1 mb-4 text-sm'>
                    <p className='pl-1 font-bold'>{formData.title}</p>
                    <p className='pl-1'>{formData.desc}</p>
                    <div className='bg-pink-400 h-[1px]'></div>
                </div>

                <form
                onSubmit={handleSubmit(addCourse)}
                className="w-full flex flex-col justify-center items-center "
                >
                    <div className="grid grid-cols-2 gap-4 w-full">
                        {formData.inputs.map((input, index) => {
                                if(input.defaultValue !== undefined)
                                    return <Input
                                                key={index}
                                                label={input.label}
                                                type={input.type}
                                                
                                                defaultValue={parentData[input.defaultValue]}
                                                placeholder={input.placeholder}
                                                {...register(input.name, { required: input.required })}
                                            />

                                return <Input
                                    key={index}
                                    label={input.label}
                                    type={input.type}
                                    placeholder={input.placeholder}
                                    {...register(input.name, { required: input.required })}
                                />
                            }
                        )}
                    </div>

                    <div className="grid grid-cols-1 gap-4 w-1/2 mt-4">
                        {formData.buttons.map((button, index) => (
                            <div key={index} className="mt-4">
                                <Button type={button.type} className={button.style}>
                                    {button.text}
                                </Button>
                            </div>
                        ))}
                    </div>

                </form>
                
            </div>
        </div>
    );
}

export default OverlayForm;
