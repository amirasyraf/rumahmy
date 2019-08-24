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
                <div style={{ display: "flex", "flexDirection": "row" }}>
                    <div className="sidebar">
                        <h2 align="center">Rumah.my V0.01</h2>
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
                            onData={this.propertyResultList}
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

    propertyResultList(data){
        
        const propertyName =
            data.siteSource === "lowyat" ? data.title : data.siteSource === "carigold" ? data.title : data.propertyName;

        const propertyImage =
            data.siteSource === "lowyat" ? lowyat : data.siteSource === "carigold" ? carigold : data.images[0].url;

        const propertyPrice =
            data.siteSource === "lowyat" ? 0 : data.siteSource === "carigold" ? 0 : data.propertyPrice.toLocaleString();

        const propertyLocation =
            data.siteSource === "lowyat" ? "" : data.siteSource === "carigold" ? "" : data.propertyLocation;

        const bathroom =
            data.siteSource === "lowyat" ? 0 : data.siteSource === "carigold" ? 0 : data.bathroom;

        const bedroom =
            data.siteSource === "lowyat" ? 0 : data.siteSource === "carigold" ? 0 : data.bedroom;

        const tenure =
            data.siteSource === "lowyat" ? "" : data.siteSource === "carigold" ? "" : data.tenure;

        const furnishing =
            data.siteSource === "lowyat" ? "" : data.siteSource === "carigold" ? "" : data.furnishing;

        const carPark =
            data.siteSource === "lowyat" ? "" : data.siteSource === "carigold" ? "" : data.carPark;

        const dateRetrieved =
            data.siteSource === "lowyat" ? "" : data.siteSource === "carigold" ? "" : data.dateRetrieved;

        return (
            <div className="row result-row" key={data._id}>
                <div className="col-4 flex-container">
                    <img src={propertyImage} className="image-column card"/>
                </div>
                <div className="col-8">
                    <div className="row">
                        <h3>{data.propertyName}</h3>
                    </div>
                    <hr></hr>
                    <div className="row">
                        <div className="col-3 property-attribute">
                            <p>Location:</p>
                            <p>Furnishing:</p>
                            <p>Tenure:</p>
                            <p>Price:</p>
                        </div>
                        <div className="col-3">
                            <p>{propertyLocation}</p>
                            <p>{furnishing}</p>
                            <p>{tenure}</p>
                            <p>{propertyPrice}</p>
                        </div>
                        <div className="col-3 property-attribute">
                            <p>Bedroom:</p>
                            <p>Bathroom:</p>
                            <p>Parking:</p>
                            <p>Date Retrieved:</p>
                        </div>
                        <div className="col-3">
                        <p>{bedroom}</p>
                        <p>{bathroom}</p>
                        <p>{carPark}</p>
                        <p>{dateRetrieved}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
