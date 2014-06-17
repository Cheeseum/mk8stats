import sys
import csv
import json

from collections import OrderedDict;

out_file = sys.argv[1];

data = OrderedDict();

def read_parts (in_file, attr_name):
    data[attr_name] = []
    with open(in_file, 'rb') as fd:
        reader = csv.reader(fd, quoting=csv.QUOTE_NONE)
        next(reader, None)
        for row in reader:
            for i in range(2,14):
                row[i] = float(row[i])

            data[attr_name].append(OrderedDict([
                ('name', row[1]),
                ('type', row[0]),
                ('speed', OrderedDict([
                    ('ground', row[2]),
                    ('water', row[3]),
                    ('air', row[4]),
                    ('antigrav', row[5])
                ])),
                ('accel', row[6]),
                ('weight', row[7]),
                ('handling', OrderedDict([
                    ('ground', row[8]),
                    ('water', row[9]),
                    ('air', row[10]),
                    ('antigrav', row[11])
                ])),
                ('traction', row[12]),
                ('turbo', row[13])
            ]))

def read_weights (in_file, attr_name):
    data[attr_name] = {}
    with open(in_file, 'rb') as fd:
        reader = csv.reader(fd, quoting=csv.QUOTE_NONE)
        next(reader, None)
        for row in reader:
            for i in range(2,14):
                row[i] = float(row[i])
            row[0] = float(row[0])

            data[attr_name][row[1]] = OrderedDict([
                ('order', row[0]),
                ('speed', OrderedDict([
                    ('ground', row[2]),
                    ('water', row[3]),
                    ('air', row[4]),
                    ('antigrav', row[5])
                ])),
                ('accel', row[6]),
                ('weight', row[7]),
                ('handling', OrderedDict([
                    ('ground', row[8]),
                    ('water', row[9]),
                    ('air', row[10]),
                    ('antigrav', row[11])
                ])),
                ('traction', row[12]),
                ('turbo', row[13])
            ])
    
def read_chars (in_file, attr_name):
    data[attr_name] = []
    with open(in_file, 'rb') as fd:
        reader = csv.reader(fd, quoting=csv.QUOTE_NONE)
        next(reader, None)
        for row in reader:
            data[attr_name].append(OrderedDict([
                ('name', row[0]),
                ('weight', row[1])
            ]))

def write_data ():
    with open(out_file, 'w') as fd:
        print json.dumps(data, indent=2)
        json.dump(data, fd, indent=2)

read_parts('bodies.csv', 'bodies')
read_parts('wheels.csv', 'wheels')
read_parts('gliders.csv', 'gliders')
read_weights('weights.csv', 'weights')
read_chars('characters.csv', 'characters')

write_data()
