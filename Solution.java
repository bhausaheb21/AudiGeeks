class Solution {
    static public int solution(String s) {
        int cnt = 0;

        char[] charArray = s.toCharArray();
        for (int i = 0; i < s.length(); i++) {
        
            if (charArray[i] == '^' || charArray[i] == 'v') {
                cnt++;
                charArray[i] = 'a';
            } else if (charArray[i] == '<') {
                if (i == 0) {
                    cnt++;
                    charArray[i] = 'a';
                } else if (charArray[i - 1] == 'a') {
                    cnt++;
                    charArray[i] = 'a';
                }
            }
            else if(i == s.length() - 1 && charArray[i] == '>'){
                cnt++;
                charArray[i] = 'a';
            }
        }
        return cnt;
    }

    static public void main(String[] args) {
        System.out.println(Solution.solution("><^v"));
    }

}