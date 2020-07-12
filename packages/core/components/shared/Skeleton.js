import React from 'react';
export default function Skeleton() {
  return (
    <div className="ItemListSkeleton">
      <div className="skeleton-content">
        <h3 className="skeleton-title" style={{width: '38%'}}></h3>
        <ul className="skeleton-paragraph">
          <li></li>
          <li></li>
          <li style={{width : '61%'}}></li>
        </ul>
      </div>
    </div>
  )
}