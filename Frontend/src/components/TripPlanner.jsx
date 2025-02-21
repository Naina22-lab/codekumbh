import React, { useState } from "react";
import { 
  Calendar, 
  IndianRupee, 
  MapPin, 
  Users, 
  X, 
  MapPinned, 
  Hotel, 
  Utensils, 
  Bus, 
  Wallet,
  Download 
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const preferences = [
  { value: "adventure", label: "Adventure" },
  { value: "relaxation", label: "Relaxation" },
  { value: "cultural", label: "Cultural & Historical" },
  { value: "food", label: "Food & Nightlife" },
  { value: "nature", label: "Nature & Scenic" },
];

const transportModes = [
  { value: "flight", label: "Flight" },
  { value: "train", label: "Train" },
  { value: "bus", label: "Bus" },
  { value: "road", label: "Road Trip" },
];

const ResponseSection = ({ title, icon: Icon, content }) => (
  <AccordionItem value={title.toLowerCase()}>
    <AccordionTrigger className="text-gray-200">
      <div className="flex items-center gap-2">
        <Icon className="w-5 h-5" />
        <span>{title}</span>
      </div>
    </AccordionTrigger>
    <AccordionContent>
      <div className="pl-7 pt-2 text-gray-300 space-y-2">
        {content}
      </div>
    </AccordionContent>
  </AccordionItem>
);

export const TripPlanner = () => {
  const [formData, setFormData] = useState({
    destination: "",
    budget: "",
    startDate: "",
    endDate: "",
    travelers: "1",
    preferences: [],
    transport: "",
  });

  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");

  const formatResponse = (responseText) => {
    const sections = {
      places: [],
      hotels: [],
      food: [],
      transport: [],
      costs: [],
    };

    const lines = responseText.split('\n');
    let currentSection = null;

    lines.forEach(line => {
      if (!line.trim()) return;

      // Remove asterisks from the line
      line = line.replace(/\*/g, '');

      // Determine section based on keywords
      if (line.toLowerCase().includes('places to visit') || line.toLowerCase().includes('attractions')) {
        currentSection = 'places';
      } else if (line.toLowerCase().includes('hotel') || line.toLowerCase().includes('accommodation')) {
        currentSection = 'hotels';
      } else if (line.toLowerCase().includes('food') || line.toLowerCase().includes('restaurant')) {
        currentSection = 'food';
      } else if (line.toLowerCase().includes('transport')) {
        currentSection = 'transport';
      } else if (line.toLowerCase().includes('cost') || line.toLowerCase().includes('budget')) {
        currentSection = 'costs';
      }

      // Add line to current section if it's not a section header
      if (currentSection && line.trim().length > 1 && !line.toLowerCase().includes('places to visit') && 
          !line.toLowerCase().includes('hotel recommendations') && !line.toLowerCase().includes('food and restaurants') &&
          !line.toLowerCase().includes('transportation tips') && !line.toLowerCase().includes('cost breakdown')) {
        sections[currentSection].push(line.trim());
      }
    });

    return sections;
  };

  const handleDownload = () => {
    if (!response) return;

    const formattedSections = formatResponse(response);
    let downloadContent = `Travel Plan for ${formData.destination}\n`;
    downloadContent += `${formData.startDate} to ${formData.endDate} • ${formData.travelers} travelers\n\n`;

    downloadContent += "Places to Visit:\n";
    formattedSections.places.forEach(place => downloadContent += `- ${place}\n`);
    downloadContent += "\nHotel Recommendations:\n";
    formattedSections.hotels.forEach(hotel => downloadContent += `- ${hotel}\n`);
    downloadContent += "\nFood & Restaurants:\n";
    formattedSections.food.forEach(food => downloadContent += `- ${food}\n`);
    downloadContent += "\nTransportation Tips:\n";
    formattedSections.transport.forEach(tip => downloadContent += `- ${tip}\n`);
    downloadContent += "\nCost Breakdown:\n";
    formattedSections.costs.forEach(cost => downloadContent += `- ${cost}\n`);

    const blob = new Blob([downloadContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${formData.destination}-travel-plan.txt`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResponse(null);

    try {
      const prompt = `Generate a detailed travel plan for ${formData.destination} with these details:
        - Budget: ${formData.budget}
        - Dates: ${formData.startDate} to ${formData.endDate}
        - Number of travelers: ${formData.travelers}
        - Travel preferences: ${formData.preferences.join(", ")}
        - Transport mode: ${formData.transport}
        
        Please provide:
        1. Best places to visit with brief descriptions
        2. Hotel recommendations within budget with approximate prices
        3. Must-try local food and recommended restaurants
        4. Local transportation tips and advice
        5. Detailed cost breakdown for the entire trip`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=AIzaSyBsE6DIh_Z4VETqntzX9_8AsqZar89q7g0`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: prompt
              }]
            }]
          })
        }
      );

      const data = await response.json();
      
      if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
        setResponse(data.candidates[0].content.parts[0].text);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err) {
      setError("Failed to generate travel plan. Please try again.");
      console.error("Error:", err);
    }

    setLoading(false);
  };

  const removePreference = (prefToRemove) => {
    setFormData({
      ...formData,
      preferences: formData.preferences.filter(pref => pref !== prefToRemove)
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Form Card */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-white">AI Travel Planner</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Destination Input */}
                <div className="space-y-2">
                  <label className="text-sm text-gray-300">Destination</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                    <Input
                      required
                      value={formData.destination}
                      onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                      placeholder="Enter your destination"
                      className="pl-10 bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                </div>

                {/* Budget Input */}
                <div className="space-y-2">
                  <label className="text-sm text-gray-300">Budget</label>
                  <div className="relative">
                    <IndianRupee className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                    <Input
                      required
                      type="number"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      placeholder="Your budget"
                      className="pl-10 bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                </div>

                {/* Date Inputs */}
                <div className="space-y-2">
                  <label className="text-sm text-gray-300">Start Date</label>
                  <Input
                    required
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-gray-300">End Date</label>
                  <Input
                    required
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>

                {/* Transport Mode Select */}
                <div className="space-y-2">
                  <label className="text-sm text-gray-300">Transport Mode</label>
                  <Select
                    required
                    value={formData.transport}
                    onValueChange={(value) => setFormData({ ...formData, transport: value })}
                  >
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue placeholder="Select transport" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-gray-600">
                      <SelectGroup>
                        {transportModes.map((mode) => (
                          <SelectItem key={mode.value} value={mode.value} className="text-white">
                            {mode.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                {/* Number of Travelers Input */}
                <div className="space-y-2">
                  <label className="text-sm text-gray-300">Number of Travelers</label>
                  <div className="relative">
                    <Users className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                    <Input
                      required
                      type="number"
                      min="1"
                      value={formData.travelers}
                      onChange={(e) => setFormData({ ...formData, travelers: e.target.value })}
                      className="pl-10 bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                </div>

                {/* Travel Preferences */}
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm text-gray-300">Travel Preferences</label>
                  <div className="space-y-3">
                    <Select
                      value=""
                      onValueChange={(value) => {
                        if (!formData.preferences.includes(value)) {
                          setFormData({
                            ...formData,
                            preferences: [...formData.preferences, value]
                          });
                        }
                      }}
                    >
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue placeholder="Add preferences" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 border-gray-600">
                        <SelectGroup>
                          {preferences.map((pref) => (
                            <SelectItem 
                              key={pref.value} 
                              value={pref.value}
                              disabled={formData.preferences.includes(pref.value)}
                              className="text-white"
                            >
                              {pref.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>

                    <div className="flex flex-wrap gap-2">
                      {formData.preferences.map((pref) => (
                        <Badge key={pref} variant="secondary" className="bg-gray-700">
                          {preferences.find(p => p.value === pref)?.label}
                          <button
                            type="button"
                            onClick={() => removePreference(pref)}
                            className="ml-2 hover:text-gray-300"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                disabled={loading}
              >
                {loading ? "Generating Plan..." : "Plan My Trip"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded-lg text-center">
            {error}
          </div>
        )}

        {/* Response Card */}
        {response && (
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-3xl font-bold text-white flex items-center gap-2">
                  <Calendar className="w-6 h-6" />
                  Travel Plan for {formData.destination}
                </CardTitle>
                <Button
                  onClick={handleDownload}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Plan
                </Button>
              </div>
              <p className="text-gray-400 mt-2">
                {formData.startDate} to {formData.endDate} • {formData.travelers} travelers
              </p>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="space-y-4">
                <ResponseSection
                  title="Places to Visit"
                  icon={MapPinned}
                  content={formatResponse(response).places.map((place, idx) => (
                    <p key={idx}>{place}</p>
                  ))}
                />
                <ResponseSection
                  title="Hotel Recommendations"
                  icon={Hotel}
                  content={formatResponse(response).hotels.map((hotel, idx) => (
                    <p key={idx}>{hotel}</p>
                  ))}
                />
                <ResponseSection
                  title="Food & Restaurants"
                  icon={Utensils}
                  content={formatResponse(response).food.map((item, idx) => (
                    <p key={idx}>{item}</p>
                  ))}
                />
                <ResponseSection
                  title="Transportation Tips"
                  icon={Bus}
                  content={formatResponse(response).transport.map((tip, idx) => (
                    <p key={idx}>{tip}</p>
                  ))}
                />
                <ResponseSection
                  title="Cost Breakdown"
                  icon={Wallet}
                  content={formatResponse(response).costs.map((cost, idx) => (
                    <p key={idx}>{cost}</p>
                  ))}
                />
              </Accordion>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default TripPlanner;