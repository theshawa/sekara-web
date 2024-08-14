import { useState, React } from 'react';

function CommentBox() {

    const [count, setCount] = useState(0)
    const [comment, setComment] = useState("sdfs")

    const Commenting = async (e) => {

        e.preventDefault();

        setComment(e.target.value);


    }

    const Posting = () => {

        setCount(count + 1)

    }

    return (

        <>

            <section class="my-20">

                <div class="space-y-[15px]">

                    <h2 class="text-inter text-[20px]">{count} Comments</h2>

                    <h2>{comment}</h2>

                </div>

                <hr class="border-slate-300 my-[20px]"></hr>

                <div>

                    <h1 class="text-inter text-[20px]">Add Comment</h1>

                    <label class="space-x-[10px]">

                        <input class="bg-slate-100 border-solid border-1 border-slate-300 rounded-lg px-[20px] py-[10px]" type="text" placeholder='Nice Article...' onChange={Commenting}></input>

                    </label>

                    <button class="text-inter text-[16px] rounded-[8px] px-[20px] py-[8px] bg-slate-900 border-solid border-1 border-slate-950 text-slate-200" type="submit" onClick={Posting}>Post</button>

                </div>

            </section>

        </>

    );

}

export default CommentBox;