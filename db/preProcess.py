import pandas as pd
import json
import numpy as np
def preprocess(csvFilePath):
	df = pd.read_csv(csvFilePath,sep = ',')
	columns = df.columns
	array = []
	for (i,(_,row)) in enumerate(df.iterrows()):
		if type(row['Lyrics']) is float and np.isnan(row['Lyrics']):
			row['Lyrics'] = ""
		if np.isnan(row['Source']):
			row['Source'] = 1.0
		array.append(constructJSON(row))
	# array = array[:42]
	return array

def constructJSON(row):
	res= dict()
	res['Rank'] = row['Rank']
	res['Song'] = row['Song']
	res['Artist'] = row['Artist']
	res['Year'] = row['Year']
	res['Lyrics'] = row['Lyrics']
	res['Source'] = row['Source']
	return res

if __name__ == "__main__":
	res = preprocess('BillBoard-History.csv')
	with open('BillBoard-History.json', 'w',encoding="utf-8") as json_file:  
		json.dump(res,json_file,indent=4)
