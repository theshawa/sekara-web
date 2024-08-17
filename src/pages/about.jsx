import bannerImg from "../assets/sekara-banner.png";
export const AboutPage = () => {
  return (
    <div className="flex flex-col py-10 max-w-screen-sm mx-auto">
      <h1>We are Sēkara</h1>
      <img
        src={bannerImg}
        alt="Sekara Banner"
        className="rounded-xl mt-5 aspect-video object-cover"
      />
      <p className="mt-10">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi.
        Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla,
        mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis
        tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non
        suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus
        ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales.
        Quisque sagittis orci ut diam condimentum, vel euismod erat placerat. In
        iaculis arcu eros, eget tempus orci facilisis id.Lorem ipsum dolor sit
        amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit
        urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur,
        ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet
        augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu.
        Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet.
        Pellentesque commodo lacus at sodales sodales. Quisque sagittis orci ut
        diam condimentum, vel euismod erat placerat. In iaculis arcu eros, eget
        tempus orci facilisis id.Lorem ipsum dolor sit amet, consectetur
        adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque
        sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris.
        Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum
        auctor ornare leo, non suscipit magna interdum eu. Curabitur
        pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque
        commodo lacus at sodales sodales. Quisque sagittis orci ut diam
        condimentum, vel euismod erat placerat. In iaculis arcu eros, eget
        tempus orci facilisis id.
      </p>
    </div>
  );
};
