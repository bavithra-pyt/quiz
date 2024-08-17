"use client";
import Image from "next/image";
import {
  Divider,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const fetchQuiz = async (): Promise<any[]> => {
    try {
      const response = await fetch(
        `https://quizapi.io/api/v1/questions?apiKey=${process.env.NEXT_PUBLIC_API_KEY}&limit=10`
      );
      if (!response.ok) {
        const errMsg = await response.json();
        throw new Error(errMsg);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("Error fetching quiz data:", error);
      return []; // Return an empty array on error
    }
  };

  const { data: dataQuiz, error } = useQuery({
    queryKey: ["quiz"],
    queryFn: fetchQuiz,
  });

  if (error) {
    console.log("Error fetching quiz data:", error);
  }

  return (
    <Box
      sx={{
        background:
          "linear-gradient(244deg, #BEEAEB 0%, rgba(190, 234, 235, 0.00) 37.75%), #FFF",
        width: { lg: "87%", xs: "90%" },
        height: { lg: "72.5vh", xs: "100%" },
        display: "flex",
        flexDirection: "column",
        padding: { lg: "100px", xs: "20px" },
      }}
    >
      {dataQuiz?.map((item: any) => (
        <Box key={item?.id}>
          <Typography
            variant="body1"
            sx={{
              color: "#304682",
              fontSize: { lg: "24px", xs: "20px" },
            }}
          >
            {`Question ${item?.id}: ${item.question}`}
          </Typography>
          <RadioGroup>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                marginTop: "20px",
                marginBottom:'20px'
              }}
            >
              {Object.entries(item?.answers || {}).map(([key, value], index) => (
                value !== null ? (
                  <Box
                    key={key} // Use `key` from the object as a unique key
                    sx={{
                      paddingLeft: "10px",
                      paddingTop: "4px",
                      paddingBottom: "4px",
                      borderRadius: "25px",
                      border: "1px solid #E1E1E1",
                      backgroundColor: "white",
                      width: "fit-content",
                      height: "fit-content",
                    }}
                  >
                    <FormControlLabel
                      value={key}
                      label={value as string}
                      
                      control={
                        <Radio
                          sx={{
                            "& .MuiSvgIcon-root": {
                              fontSize: 20,
                            },
                            "&.Mui-checked": {
                              color: "#028CA8",
                            },
                            "&.MuiRadio-root": {
                              color: "#028CA8",
                            },
                            "&.Mui-disabled": {
                              color: "#B0BEC5",
                            },
                          }}
                        />
                      }
                    />
                  </Box>
                ) : null
              ))}
            </Box>
          </RadioGroup>
        </Box>
      ))}

      <Box
        sx={{
          flexDirection: "column",
          display: "flex",
          position: "fixed",
          bottom: "0px",
          left: "0px",
          right: "0px",
        }}
      >
        <Divider />
        <Box
          sx={{
            display: "flex",
            width: "90%",
            justifyContent: "end",
            padding: "16px",
            backgroundColor:'white'
          }}
        >
          <Box
            sx={{
              borderRadius: "50px",
              backgroundColor: "#304682",
              fontSize: "20px",
              fontStyle: "normal",
              fontWeight: "bold",
              color: "white",
              width: "fit-content",
              padding: "18px 50px",
              justifyContent: "end",
              cursor: "pointer",
            }}
          >
            Next
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
