import React, { Component } from "react";
import { ReactiveBase, DataSearch, ReactiveList, SelectedFilters, SingleDataList, MultiDataList, MultiList, RangeSlider, MultiDropdownList } from "@appbaseio/reactivesearch";
import './bootstrap.css';
import './index.css';

import lowyat from "./placeholder/lowyat.jpg";
import carigold from "./placeholder/carigold.jpg";

class App extends Component {
    render() {
        return (
            <ReactiveBase url="http://209.97.169.103:9200/" app="scrapy">
                <div className="container">
                    <div className="card topbar">
                        <h2>Rumah.my V0.06</h2>
                        <div className="component-container">
                            <DataSearch
                                componentId="searchbox"
                                dataField="propertyName"
                                placeholder="Search..."
                                filterLabel="Filter"
                                iconPosition="right"
                                URLParams={true}
                            />
                        </div>
                    	<div className="component-container">
                    		<MultiDataList
                    			title="Bedroom"
                    			componentId="Bedroom"
							  	dataField="bedroom"
							  	showSearch={false}
							  	innerClass={{list: 'filter-checkbox'}}
							  	data={
							  		[{ label: '1', value: '1' },
                                     { label: '2', value: '2' },
                                     { label: '3', value: '3' },
                                     { label: '4', value: '4' },
                                     { label: '5', value: '5' },
                                     { label: '6', value: '6' }]
								}							  	
							/>
                    	</div>
                    	<div className="component-container">
                    		<MultiDataList
                    			title="Bathroom"
                    			componentId="Bathroom"
							  	dataField="bedroom"
							  	showSearch={false}
							  	innerClass={{list: 'filter-checkbox'}}
							  	data={
							  		[{ label: '1', value: '1' },
                                     { label: '2', value: '2' },
                                     { label: '3', value: '3' },
                                     { label: '4', value: '4' },
                                     { label: '5', value: '5' },
                                     { label: '6', value: '6' }]
								}							  	
							/>
                    	</div>
                    	<div className="component-container">
                    		<MultiDataList
                                title="Tenure"
                                componentId="Tenure"
                                dataField="tenure.keyword"
                                showSearch={false}
                                data={[
                                  { label: 'Freehold', value: 'Freehold' },
                                  { label: 'Leasehold', value: 'Leasehold' },
                                  ]}
                             />
						</div>
						<div className="component-container">
							<MultiDataList
                                title="Furnishing"
                                componentId="Furnishing"
                                dataField="furnishing.keyword"
                                showSearch={false}
                                data={[
                                  { label: 'Fully-Furnished', value: 'Fully Furnished' },
                                  { label: 'Partially-Furnished', value: 'Partly Furnished' },
                                  { label: 'Unfurnished', value: 'Unfurnished' },

                                  ]}
                            />
						</div>
						<div className="component-container">
							<MultiDropdownList
								title="Source"
								placeholder="Select Source"
								componentId="siteSource"
								dataField="siteSource.keyword"
								showSearch={false}
								defaultSelected={["iproperty","mudahmy"]}
							/>
						</div>
                    </div>
                    <div className="result-container">
                    	<SelectedFilters></SelectedFilters>
                        <ReactiveList
                            componentId="result"
                            dataField="propertyName"
                            title="Results"
                            from={0}
                            size={9}
                            pagination={false}
                            showResultStats={false}
                            onAllData={this.onAllData}
                            react={{
                              and: ["searchbox", "Bathroom", "Bedroom", "Tenure", "Furnishing", "siteSource", "testSensor", "propertyLocation"]
                            }}
                            sortOptions={[
                              { dataField: "propertyPrice.keyword", sortBy: "desc", label: "Desc Price" },
                              { dataField: "propertyPrice.keyword", sortBy: "asc", label: "Asc Price" },
                              { dataField: "dateRetrieved.keyword", sortBy: "desc", label: "Desc Date" },
                              { dataField: "dateRetrieved.keyword", sortBy: "asc", label: "Asc Date" }

                            ]}
                        />
                    </div>
                </div>
            </ReactiveBase>
        );
    }

    onAllData(data, streamData){

        // datas.map(data => {
        //     const propertyName =
        //         data.siteSource === "lowyat" ? data.title : data.siteSource === "carigold" ? data.title : data.propertyName;

        //     const propertyImage =
        //         data.siteSource === "lowyat" ? lowyat : data.siteSource === "carigold" ? carigold : data.images[0].url;

        //     const propertyPrice =
        //         data.siteSource === "lowyat" ? 0 : data.siteSource === "carigold" ? 0 : data.propertyPrice.toLocaleString();

        //     const propertyLocation =
        //         data.siteSource === "lowyat" ? "" : data.siteSource === "carigold" ? "" : data.propertyLocation;

        //     const bathroom =
        //         data.siteSource === "lowyat" ? 0 : data.siteSource === "carigold" ? 0 : data.bathroom;

        //     const bedroom =
        //         data.siteSource === "lowyat" ? 0 : data.siteSource === "carigold" ? 0 : data.bedroom;

        //     const tenure =
        //         data.siteSource === "lowyat" ? "" : data.siteSource === "carigold" ? "" : data.tenure;

        //     const furnishing =
        //         data.siteSource === "lowyat" ? "" : data.siteSource === "carigold" ? "" : data.furnishing;

        //     const carPark =
        //         data.siteSource === "lowyat" ? "" : data.siteSource === "carigold" ? "" : data.carPark;

        //     const dateRetrieved =
        //         data.siteSource === "lowyat" ? "" : data.siteSource === "carigold" ? "" : data.dateRetrieved;

        // })


        return (
            <div className="grid">
                {
                    data.map((item) => 
                        <a href={item.propertyLink} target="_blank" key={item._id}>
	                        <div className="card">
	                        	<div className="image-column">
	                        		<img src={item.images[0].url}/>
	                                <span className="image-overlay-source">{item.siteSource}</span>
	                                <span className="image-overlay-price">RM {item.propertyPrice}</span>
	                        	</div>
	                            <div className="content">
	                                <div className="title">
	                                    <h5>{item.propertyName}</h5>
	                                </div>
	                                <div className="attributes">
	                                    <i className="fas fa-map-marked-alt"><span> {item.propertyLocation}</span></i>
	                                    <br></br>
	                                    <br></br>
	                                    <div className="small">
		                                    <i className="fas fa-bed"><span> &nbsp;{item.bedroom}</span></i>
		                                    <i className="fas fa-shower"><span> &nbsp;{item.bathroom}</span></i>
		                                    <i className="fas fa-car"><span> &nbsp;{item.carPark}</span></i>
		                                    <i className="fas fa-couch test"><span> &nbsp;{item.furnishing}</span></i>
		                                    <i className="fas fa-home"><span> &nbsp;{item.tenure}</span></i>
	                                    </div>
	                                    <h6>Date Retrieved:<span> {item.dateRetrieved}</span></h6>
	                                </div>
	                            </div>
	                        </div>
	                    </a>
                    )
                }
            </div>
        );
    }
}

export default App;
