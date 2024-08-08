import ClapIcon from './ClapIcon';

export const ArticlePage = () => {

    const obj = {

        name: "John doe",
        posted_date: "Mar 03"

    }

    return <>

        ArticlePage

        <h1 class="text-5xl">Embrace Growth : 5 Simple Steps to Boost Your Personal Development</h1>

        <section class="flex space-x-5 my-5 text-xs text-slate-500">

            <div><a class="hover:bg-slate-200" href='/profile1'>{obj.name}</a></div>
            <div>tag</div>
            <div>{obj.posted_date}</div>
            <div class="flex space-x-2">

                <ClapIcon />

            </div>

        </section>

    </>;

};