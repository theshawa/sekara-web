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

        <div>

            <p class="font-inter text-lg my-10">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis
                ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna
                interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque
                sagittis orci ut diam condimentum, vel euismod erat placerat. In iaculis arcu eros, eget tempus orci facilisis id.Lorem ipsum dolor sit amet,
                consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices
                mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur
                pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque sagittis orci ut diam condimentum,
                vel euismod erat placerat. In iaculis arcu eros, eget tempus orci facilisis id.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna.
            </p>

            <p class="font-inter text-lg my-5">

                Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur
                pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque sagittis orci ut diam condimentum, vel euismod erat placerat. In iaculis arcu eros, eget tempus orci facilisis id.

            </p>

        </div>

    </>;

};