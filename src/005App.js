import React, { Component } from "react";
import { ReactiveBase, DataSearch, ReactiveList, SelectedFilters, SingleDataList, MultiDataList, MultiList, RangeSlider } from "@appbaseio/reactivesearch";
import './bootstrap.css';
import './index.css';

import lowyat from "./placeholder/lowyat.jpg";
import carigold from "./placeholder/carigold.jpg";

class App extends Component {
    render() {
        return (
            <ReactiveBase url="http://68.183.226.180:9200/" app="scrapy">
                <div className="container">
                    <div className="sidebar">
                        <h2 align="center">Rumah.my V0.05</h2>
                        <div className="componentContainer">
                            <DataSearch
                                componentId="searchbox"
                                dataField="propertyName"
                                placeholder="Search..."
                                filterLabel="Filter"
                                iconPosition="right"
                                URLParams={true}
                                style={
                                    {
                                        padding: "5px",
                                        "marginTop": "20px"
                                    }
                                }
                            />
                        </div>
                        <div className="componentContainer">
                            <MultiList
                                title="Location"
                                componentId="propertyLocation"
                                dataField="propertyLocation.keyword"
                                size={100}
                                showSearch={true}
                                showLoadMore={true}
                            />
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <MultiDataList
                                    title="Bedroom"
                                    componentId="Bedroom"
                                    dataField="bedroom"
                                    showSearch={false}
                                    data={[
                                      { label: '1', value: '1' },
                                      { label: '2', value: '2' },
                                      { label: '3', value: '3' },
                                      { label: '4', value: '4' },
                                      { label: '5', value: '5' },
                                      { label: '6', value: '6' },


                                      ]}
                                />
                            </div>

                            <div className="col-6">
                                <MultiDataList
                                    title="Bathroom"
                                    componentId="Bathroom"
                                    dataField="bathroom"
                                    showSearch={false}
                                    data={[
                                      { label: '1', value: '1' },
                                      { label: '2', value: '2' },
                                      { label: '3', value: '3' },
                                      { label: '4', value: '4' },
                                      { label: '5', value: '5' },

                                      ]}
                                />
                            </div>
                        </div>
                        <div className="componentContainer">
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
                        <div className="componentContainer">
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
                        <div className="componentContainer">
                            <MultiList
                                title="Source"
                                componentId="siteSource"
                                dataField="siteSource.keyword"
                                showSearch={false}

                            />
                        </div>
                      <SelectedFilters></SelectedFilters>
                    </div>
                    <div className="result-container">
                        <ReactiveList
                            componentId="result"
                            dataField="propertyName"
                            title="Results"
                            from={0}
                            size={8}
                            pagination={true}
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
	                            <div className="flex-container">
	                                <div className="image-column">
	                                    <img src={item.images[0].url}/>
	                                    <span className="image-source">{item.siteSource}</span>
	                                </div>
	                            </div>
	                            <div className="horizontal-line"></div>
	                            <div className="content">
	                                <div className="title">
	                                    <h4>{item.propertyName}</h4>
	                                </div>
	                                <div className="attributes">
	                                	<h6>Location:</h6>
	                                    <p>{item.propertyLocation}</p>
	                                    <h6>Price:</h6>
	                                    <p>{item.propertyPrice}</p>
	                                    <h6>Bedroom:</h6>
	                                    <p>{item.bedroom}</p>
	                                    <h6>Bathroom:</h6>
	                                    <p>{item.bathroom}</p>
	                                    <h6>Car Park:</h6>
	                                    <p>{item.carPark}</p>
	                                    <h6>Furnishing:</h6>
	                                    <p>{item.furnishing}</p>
	                                    <h6>Tenure:</h6>
	                                    <p>{item.tenure}</p>
	                                    <h6>Date Retrieved:</h6>
	                                    <p>{item.dateRetrieved}</p>
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
