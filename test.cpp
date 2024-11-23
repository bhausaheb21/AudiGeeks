#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

bool isInsideRectangle(int x_min, int y_min, int x_max, int y_max, int x, int y) {
    return x >= x_min && x <= x_max && y >= y_min && y <= y_max;
}

int maxPointsInRectangle(const vector<pair<int, int>>& points, int perimeter) {
    int maxPoints = 0;



    int halfPerimeter = perimeter / 2;


    vector<pair<int, int>> possibleSides;
    for (int length = 1; length < halfPerimeter; length++) {
        int width = halfPerimeter - length;
        possibleSides.push_back({length, width});
    }


    for (int i = 0; i < points.size(); ++i) {
        for (int j = i + 1; j < points.size(); ++j) {
            int x1 = points[i].first, y1 = points[i].second;
            int x2 = points[j].first, y2 = points[j].second;

        
            for (const auto& sides : possibleSides) {
                int length = sides.first;
                int width = sides.second;

            
                if ((abs(x1 - x2) <= length && abs(y1 - y2) <= width) ||
                    (abs(x1 - x2) <= width && abs(y1 - y2) <= length)) {

                
                    int x_min = min(x1, x2);
                    int x_max = max(x1, x2);
                    int y_min = min(y1, y2);
                    int y_max = max(y1, y2);

                
                    int count = 0;
                    for (const auto& point : points) {
                        if (isInsideRectangle(x_min, y_min, x_max, y_max, point.first, point.second)) {
                            count++;
                        }
                    }

                
                    maxPoints = max(maxPoints, count);
                }
            }
        }
    }

    return maxPoints;
}

int main() {

    vector<pair<int, int>> points = {{-2,-1}, {-2,-0}, {-2, 1}, {-3, 3}, {-2, -3}, {-1, 3}};
    int perimeter = 4;
    
    int result = maxPointsInRectangle(points, perimeter);
    cout << "Maximum points inside the rectangle: " << result << endl;

    return 0;
}
