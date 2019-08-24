import React, { Component } from "react";
import { ReactiveBase, DataSearch, ResultList, SelectedFilters, SingleDataList, MultiDataList, MultiList } from "@appbaseio/reactivesearch";
//import './bootstrap.css';
import './index.css';

import lowyat from "./placeholder/lowyat.jpg";
import carigold from "./placeholder/carigold.jpg";

class App extends Component {
    render() {
        return (
            <ReactiveBase
                url="http://178.128.18.17:9200/"
                app="scrapy">
                <div style={{ display: "flex", "flexDirection": "row" }}>
                    <div className="sidebar">
                        <div className="componentContainer">
                            <DataSearch
                                componentId="searchbox"
                                dataField="propertyName"
                                placeholder="Search for properties"
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
                    <div className="resultList">
                        <ResultList
                            componentId="result"
                            dataField="propertyName"
                            title="Results"
                            from={0}
                            size={8}
                            pagination={true}
                            showResultStats={false}
                            react={{
                              and: ["searchbox", "Bathroom", "Bedroom", "Tenure", "Furnishing", "siteSource"]
                            }}
                            sortOptions={[
                              { dataField: "propertyPrice.keyword", sortBy: "desc", label: "Desc Price" },
                              { dataField: "propertyPrice.keyword", sortBy: "asc", label: "Asc Price" }

                            ]}
                            onData={(res) => {

                                const propertyName =
                                    res.siteSource === "lowyat" ? res.title : res.siteSource === "carigold" ? res.title : res.propertyName;

                                const propertyImage =
                                    res.siteSource === "lowyat" ? lowyat : res.siteSource === "carigold" ? carigold : res.images[0].url;

                                const propertyPrice =
                                    res.siteSource === "lowyat" ? 0 : res.siteSource === "carigold" ? 0 : res.propertyPrice.toLocaleString();

                                const propertyLocation =
                                    res.siteSource === "lowyat" ? "" : res.siteSource === "carigold" ? "" : res.propertyLocation;

                                const bathroom =
                                    res.siteSource === "lowyat" ? 0 : res.siteSource === "carigold" ? 0 : res.bathroom;

                                const bedroom =
                                    res.siteSource === "lowyat" ? 0 : res.siteSource === "carigold" ? 0 : res.bedroom;

                                const tenure =
                                    res.siteSource === "lowyat" ? "" : res.siteSource === "carigold" ? "" : res.tenure;

                                const furnishing =
                                    res.siteSource === "lowyat" ? "" : res.siteSource === "carigold" ? "" : res.furnishing;

                                return {
                                    image: propertyImage,
                                    title: propertyName,
                                    description: (
                                    <div>
                                        {/*<div>{res.images.map(item=>(<img src={item.path} key={item.checksum}/>))}</div>*/}
                                        <p>Date Retrieved: {res.dateRetrieved}</p>
                                        <p>RM {propertyPrice}</p>
                                        <p>{propertyLocation}</p>
                                        <p>Bathroom: {bathroom}</p>
                                        <p>Bedroom: {bedroom}</p>
                                        <p>Tenure: {tenure}</p>
                                        <p>Furnishing: {furnishing}</p>
                                        <p>{res.siteSource}</p>
                                        {/*<p>{test}</p>*/}
                                    </div>
                                    ),
                                    url: res.url
                                }
                            }}
                        />
                    </div>
                </div>
            </ReactiveBase>
        );
    }
}

export default App;
