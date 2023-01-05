import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = (props) => (
  <ContentLoader className="pizza-block"
    speed={2}
    width={280}
    height={460}
    viewBox="0 0 280 460"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="129" y="406" rx="16" ry="16" width="151" height="46" />
    <rect x="-5" y="263" rx="3" ry="3" width="284" height="21" />
    <rect x="1" y="317" rx="17" ry="17" width="280" height="75" />
    <rect x="4" y="416" rx="3" ry="3" width="96" height="30" />
    <circle cx="133" cy="116" r="110" />
  </ContentLoader>
)

export default Skeleton;