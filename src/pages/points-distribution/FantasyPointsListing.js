import React from 'react';

const FantasyPointsListing = ({ data = {} }) => {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Fantasy Points Listing</h1>
      <div className="space-y-6">
        {/* Important Fantasy Points Section */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Important Fantasy Points</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.importantFantasyPoints &&
              Object.keys(data.importantFantasyPoints).map((key) => (
                <div key={key} className="border p-4 rounded-lg">
                  <h3 className="text-xl font-bold mb-2">{key}</h3>
                  <ul className="space-y-2">
                    {Object.entries(data.importantFantasyPoints[key]).map(([subKey, value]) => (
                      <li key={subKey} className="flex justify-between">
                        <span className="font-medium capitalize">{subKey}:</span>
                        <span>{value}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
          </div>
        </section>

        {/* Batting Points Section */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Batting Points</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.battingPoints &&
              Object.keys(data.battingPoints).map((key) => (
                <div key={key} className="border p-4 rounded-lg">
                  <h3 className="text-xl font-bold mb-2">{key}</h3>
                  <ul className="space-y-2">
                    {Object.entries(data.battingPoints[key]).map(([subKey, value]) => (
                      <li key={subKey} className="flex justify-between">
                        <span className="font-medium capitalize">{subKey.replace(/([A-Z])/g, ' $1')}:</span>
                        <span>{value}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
          </div>
        </section>

        {/* Bowling Points Section */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Bowling Points</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.bowlingPoints &&
              Object.keys(data.bowlingPoints).map((key) => (
                <div key={key} className="border p-4 rounded-lg">
                  <h3 className="text-xl font-bold mb-2">{key}</h3>
                  <ul className="space-y-2">
                    {Object.entries(data.bowlingPoints[key]).map(([subKey, value]) => (
                      <li key={subKey} className="flex justify-between">
                        <span className="font-medium capitalize">{subKey.replace(/([A-Z])/g, ' $1')}:</span>
                        <span>{value}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
          </div>
        </section>

        {/* Fielding Points Section */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Fielding Points</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.fieldingPoints &&
              Object.keys(data.fieldingPoints).map((key) => (
                <div key={key} className="border p-4 rounded-lg">
                  <h3 className="text-xl font-bold mb-2">{key}</h3>
                  <ul className="space-y-2">
                    {Object.entries(data.fieldingPoints[key]).map(([subKey, value]) => (
                      <li key={subKey} className="flex justify-between">
                        <span className="font-medium capitalize">{subKey.replace(/([A-Z])/g, ' $1')}:</span>
                        <span>{value}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
          </div>
        </section>

        {/* Additional Points Section */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Additional Points</h2>
          <ul className="space-y-2">
            {data.additionalPoints &&
              Object.entries(data.additionalPoints).map(([key, value]) => (
                <li key={key} className="flex justify-between">
                  <span className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                  <span>{value}</span>
                </li>
              ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default FantasyPointsListing;
